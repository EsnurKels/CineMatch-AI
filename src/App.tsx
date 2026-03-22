import { Analytics } from '@vercel/analytics/react';
import { useState, useEffect, useCallback } from 'react';
import { getMovieSuggestions } from './services/gemini';
import { getMoviePoster } from './services/tmdb';
import { Navbar } from './components/Navbar';
import { SearchBar } from './components/SearchBar';
import { MovieCard } from './components/MovieCard';
import { MovieModal } from './components/MovieModal';
import { Hero } from "./components/Hero";
import { PromptSuggestions } from './components/PromptSuggestions';
import { Footer } from './components/Footer';
import { generateRandomPrompts } from './utils/promptGenerator';
import type { Movie } from './types/index';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import MoodSelector from "./components/MoodSelector";
import { getAllWatchlistDB, addToWatchlistDB, removeFromWatchlistDB } from './services/db';

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState<'search' | 'library'>('search');
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [randomPrompts, setRandomPrompts] = useState(() => generateRandomPrompts());
  const [allMovieNames, setAllMovieNames] = useState<string[]>([]);

  useEffect(() => {
    const loadWatchlist = async () => {
      const savedWatchlist = await getAllWatchlistDB();
      setWatchlist(savedWatchlist);
    };
    loadWatchlist();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const fetchMovieDetails = async (names: string[]) => {
    return await Promise.all(
      names.map(async (name) => {
        const details = await getMoviePoster(name);
        return {
          id: details?.id || name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0),
          name: name,
          poster: details?.poster_path || "https://via.placeholder.com/500x750?text=No+Image",
          vote: details?.vote_average || 0,
          date: details?.release_date || "N/A",
          overview: details?.overview || "Özet bulunamadı."
        } as Movie;
      })
    );
  };

  const handleSearch = useCallback(async (searchQuery?: string) => {
    const finalQuery = searchQuery || query;
    if (!finalQuery.trim() || loading) return;

    setLoading(true);
    setMovies([]);
    setAllMovieNames([]);
    setActiveTab('search');

    try {
      // Sadece kullanıcı cümlesini gönderiyoruz, gerisini gemini.ts hallediyor
      const names = await getMovieSuggestions(finalQuery);

      const uniqueNames = [...new Set(names)];
      setAllMovieNames(uniqueNames);

      // İlk gösterim: Eğer 3 tane geldiyse 3 tane, çok geldiyse ilk 5 tanesini çek
      const initialShowCount = uniqueNames.length < 5 ? uniqueNames.length : 5;
      const firstBatch = uniqueNames.slice(0, initialShowCount);

      const movieData = await fetchMovieDetails(firstBatch);
      setMovies(movieData);
    } catch (error) {
      console.error("Arama hatası:", error);
    } finally {
      setLoading(false);
    }
  }, [query, loading]);

  const handleMore = async () => {
    if (loading || allMovieNames.length <= movies.length) return;
    setLoading(true);

    try {
      if (allMovieNames.length - movies.length <= 5) {
        const currentTitles = movies.map(m => m.name).slice(-20).join(", ");
        const moreNames = await getMovieSuggestions(
          `${query} türünde yeni öneriler. (Şunları ZATEN ÖNERDİN: ${currentTitles})`
        );
        setAllMovieNames(prev => [...new Set([...prev, ...moreNames])]);
      }

      const nextBatchNames = allMovieNames
        .filter(name => !movies.some(m => m.name === name))
        .slice(0, 5);

      if (nextBatchNames.length > 0) {
        const moreDetails = await fetchMovieDetails(nextBatchNames);
        setMovies(prev => [...prev, ...moreDetails]);
      }
    } catch (error) {
      console.error("Yükleme hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleWatchlist = async (movie: Movie) => {
    const exists = watchlist.find(x => x.id === movie.id);
    if (exists) {
      await removeFromWatchlistDB(movie.id);
      setWatchlist(prev => prev.filter(x => x.id !== movie.id));
    } else {
      await addToWatchlistDB(movie);
      setWatchlist(prev => [...prev, movie]);
    }
  };

  const handleReset = () => {
    setMovies([]);
    setAllMovieNames([]);
    setQuery("");
    setActiveTab('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-700 ${isDarkMode ? 'bg-[#0a0a0c]' : 'bg-[#f8fafc]'}`}>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} activeTab={activeTab} setActiveTab={setActiveTab} onReset={handleReset} />

      <main className="flex-grow pt-32 pb-20 max-w-7xl mx-auto px-6 w-full">
        {activeTab === 'search' ? (
          <>
            {movies.length === 0 && !loading && <Hero isDarkMode={isDarkMode} />}
            <SearchBar query={query} setQuery={setQuery} onSearch={() => handleSearch()} loading={loading} isDarkMode={isDarkMode} />

            {movies.length === 0 && !loading && (
              <>
                <MoodSelector isVisible={true} isDarkMode={isDarkMode} onMoodSearch={(text) => { setQuery(text); handleSearch(text); }} />
                <PromptSuggestions prompts={randomPrompts} onRefresh={() => setRandomPrompts(generateRandomPrompts())} onSelect={(text) => { setQuery(text); handleSearch(text); }} isDarkMode={isDarkMode} />
              </>
            )}

            {(movies.length > 0 || loading) && (
              <div className="mt-12">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                  {movies.map((m) => (
                    <MovieCard key={m.id} movie={m} onClick={() => setSelectedMovie(m)} isDarkMode={isDarkMode} />
                  ))}
                  {loading && Array.from({ length: 5 }).map((_, i) => (
                    <div key={`skeleton-${i}`} className={`aspect-[2/3] rounded-[2.5rem] animate-pulse ${isDarkMode ? 'bg-slate-900' : 'bg-slate-200'}`} />
                  ))}
                </div>

                {/* Buton Zekası: Sadece daha fazla film varsa ve kullanıcı kısıtlı bir sayı istemediyse göster */}
                {allMovieNames.length > movies.length && (
                  <div className="flex justify-center mt-12 mb-20">
                    <button
                      onClick={handleMore}
                      disabled={loading}
                      className="px-10 py-4 rounded-2xl font-black tracking-[0.3em] uppercase text-[11px] transition-all border-2 bg-transparent border-indigo-600/50 text-indigo-500 hover:border-indigo-600 hover:text-indigo-600 disabled:opacity-50 shadow-xl shadow-indigo-500/10 active:scale-95"
                    >
                      {loading ? "Sıradakiler Hazırlanıyor..." : "Daha Fazla Öner"}
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-32">
            <BookmarkIcon className={`w-16 h-16 mb-6 opacity-20 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
            <h2 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Koleksiyon Çok Yakında</h2>
            <p className="text-slate-500 text-sm mt-2 font-medium">Favori filmlerin burada listelenecek.</p>
          </div>
        )}
      </main>

      <Footer isDarkMode={isDarkMode} />
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          isDarkMode={isDarkMode}
          onToggleWatchlist={handleToggleWatchlist}
          isInWatchlist={!!watchlist.find(m => m.id === selectedMovie.id)}
        />
      )}
      <Analytics />
    </div>
  );
}

export default App;