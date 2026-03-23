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
import { BookmarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import MoodSelector from "./components/MoodSelector";
// DB fonksiyonlarımızı yeni yapıya göre import ediyoruz
import { getAllFromDB, addToDB, removeFromDB } from './services/db';

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState<'search' | 'library'>('search');
  
  // İki ayrı liste için state'ler
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [watched, setWatched] = useState<Movie[]>([]);
  
  // Filtreleme ve Kitaplık içi sekme state'leri
  const [hideWatched, setHideWatched] = useState(false);
  const [libraryTab, setLibraryTab] = useState<'watchlist' | 'watched'>('watchlist');
  
  const [randomPrompts, setRandomPrompts] = useState(() => generateRandomPrompts());
  const [allMovieNames, setAllMovieNames] = useState<string[]>([]);

  // İlk yüklemede her iki listeyi de çekiyoruz
  useEffect(() => {
    const loadData = async () => {
      const savedWatchlist = await getAllFromDB('watchlist');
      const savedWatched = await getAllFromDB('watched');
      setWatchlist(savedWatchlist);
      setWatched(savedWatched);
    };
    loadData();
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
      const names = await getMovieSuggestions(finalQuery);
      const uniqueNames = [...new Set(names)];
      setAllMovieNames(uniqueNames);

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

  // Yeni Toggle Fonksiyonu: Hangi listeye ekleneceğini storeName ile belirliyoruz
  const handleToggleLibrary = async (movie: Movie, storeName: 'watchlist' | 'watched') => {
    const list = storeName === 'watchlist' ? watchlist : watched;
    const exists = list.find(x => x.id === movie.id);

    if (exists) {
      await removeFromDB(movie.id, storeName);
      if (storeName === 'watchlist') setWatchlist(prev => prev.filter(x => x.id !== movie.id));
      else setWatched(prev => prev.filter(x => x.id !== movie.id));
    } else {
      // Eğer bir filmi 'izledim' olarak işaretliyorsak, 'izlenecekler'den otomatik silelim (Mantıklı UX)
      if (storeName === 'watched') {
        await removeFromDB(movie.id, 'watchlist');
        setWatchlist(prev => prev.filter(x => x.id !== movie.id));
      }
      
      await addToDB(movie, storeName);
      if (storeName === 'watchlist') setWatchlist(prev => [...prev, movie]);
      else setWatched(prev => [...prev, movie]);
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
                {/* İzlediklerimi Gizle Filtresi */}
                <div className="flex justify-end mb-6">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <span className={`text-[11px] font-black tracking-widest uppercase transition-colors ${hideWatched ? 'text-indigo-500' : 'text-slate-500'}`}>
                      İzlediklerimi Gizle
                    </span>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={hideWatched} onChange={() => setHideWatched(!hideWatched)} />
                      <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </div>
                  </label>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                  {movies
                    .filter(m => hideWatched ? !watched.some(w => w.id === m.id) : true)
                    .map((m) => (
                      <MovieCard key={m.id} movie={m} onClick={() => setSelectedMovie(m)} isDarkMode={isDarkMode} />
                    ))}
                  {loading && Array.from({ length: 5 }).map((_, i) => (
                    <div key={`skeleton-${i}`} className={`aspect-[2/3] rounded-[2.5rem] animate-pulse ${isDarkMode ? 'bg-slate-900' : 'bg-slate-200'}`} />
                  ))}
                </div>

                {allMovieNames.length > movies.length && (
                  <div className="flex justify-center mt-12 mb-20">
                    <button onClick={handleMore} disabled={loading} className="px-10 py-4 rounded-2xl font-black tracking-[0.3em] uppercase text-[11px] transition-all border-2 bg-transparent border-indigo-600/50 text-indigo-500 hover:border-indigo-600 hover:text-indigo-600 disabled:opacity-50 shadow-xl shadow-indigo-500/10 active:scale-95">
                      {loading ? "Sıradakiler Hazırlanıyor..." : "Daha Fazla Öner"}
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="py-10">
             {/* Kitaplık Alt Sekmeleri */}
             <div className="flex justify-center gap-8 mb-16 border-b border-white/5">
                <button 
                  onClick={() => setLibraryTab('watchlist')}
                  className={`pb-4 text-xs font-black tracking-widest uppercase transition-all ${libraryTab === 'watchlist' ? 'text-indigo-500 border-b-2 border-indigo-500' : 'text-slate-500'}`}
                >
                  İzleyeceklerim ({watchlist.length})
                </button>
                <button 
                  onClick={() => setLibraryTab('watched')}
                  className={`pb-4 text-xs font-black tracking-widest uppercase transition-all ${libraryTab === 'watched' ? 'text-indigo-500 border-b-2 border-indigo-500' : 'text-slate-500'}`}
                >
                  İzlediklerim ({watched.length})
                </button>
             </div>

             {/* Kitaplık İçeriği */}
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                {(libraryTab === 'watchlist' ? watchlist : watched).length > 0 ? (
                  (libraryTab === 'watchlist' ? watchlist : watched).map(movie => (
                    <MovieCard key={movie.id} movie={movie} onClick={() => setSelectedMovie(movie)} isDarkMode={isDarkMode} />
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center py-20 opacity-30 text-center">
                    {libraryTab === 'watchlist' ? <BookmarkIcon className="w-16 h-16 mb-4" /> : <CheckCircleIcon className="w-16 h-16 mb-4" />}
                    <p className="text-sm font-bold tracking-widest uppercase">Burası Şimdilik Boş</p>
                  </div>
                )}
             </div>
          </div>
        )}
      </main>

      <Footer isDarkMode={isDarkMode} />
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          isDarkMode={isDarkMode}
          onToggleLibrary={handleToggleLibrary}
          isInWatchlist={!!watchlist.find(m => m.id === selectedMovie.id)}
          isWatched={!!watched.find(m => m.id === selectedMovie.id)}
        />
      )}
      <Analytics />
    </div>
  );
}

export default App;