import { useState, useEffect, useCallback } from 'react';
import { getMovieSuggestions } from './services/gemini';
import { getMoviePoster } from './services/tmdb';
import { Navbar } from './components/Navbar';
import { SearchBar } from './components/SearchBar';
import { MovieCard } from './components/MovieCard';
import { MovieModal } from './components/MovieModal';
import { Hero } from "./components/Hero";
import { PromptSuggestions } from './components/PromptSuggestions';
import { generateRandomPrompts } from './utils/promptGenerator';
import type { Movie } from './types';
import { BookmarkIcon } from '@heroicons/react/24/outline';

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState<'search' | 'library'>('search');
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  
  // İlk render'da random promptları oluştur
  const [randomPrompts, setRandomPrompts] = useState(() => generateRandomPrompts());

  // 1. Sayfa ilk açıldığında çalışacak ayarlar
  useEffect(() => {
    const savedWatchlist = localStorage.getItem('watchlist');
    if (savedWatchlist) setWatchlist(JSON.parse(savedWatchlist));
    
    // Sayfa her yenilendiğinde (F5) promptları tazele
    setRandomPrompts(generateRandomPrompts());
  }, []);

  // 2. Karanlık mod ve Watchlist değişimlerini takip et
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [isDarkMode, watchlist]);

  const handleSearch = useCallback(async (searchQuery?: string) => {
    const finalQuery = searchQuery || query;
    if (!finalQuery.trim() || loading) return;

    setLoading(true);
    setMovies([]);
    setActiveTab('search');
    
    try {
      const names = await getMovieSuggestions(finalQuery);
      const movieData = await Promise.all(
        names.map(async (name) => {
          const details = await getMoviePoster(name);
          return { name, ...details };
        })
      );
      setMovies(movieData);
    } catch (error) {
      console.error("Arama hatası:", error);
    } finally {
      setLoading(false);
    }
  }, [query, loading]);

  const onPromptSelect = (text: string) => {
    setQuery(text);
    handleSearch(text);
  };

  const refreshPrompts = () => {
    setRandomPrompts(generateRandomPrompts());
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 ${isDarkMode ? 'bg-[#0a0a0c]' : 'bg-[#f8fafc]'}`}>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Arka plan ışık efekti */}
      <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] -z-10 pointer-events-none transition-colors duration-1000 ${isDarkMode ? 'bg-indigo-600/10' : 'bg-indigo-500/5'}`} />

      <main className="pt-32 pb-20 max-w-7xl mx-auto px-6">
        {activeTab === 'search' ? (
          <>
            {/* Arama sonuçları yoksa Hero ve Önerileri göster */}
            {movies.length === 0 && !loading && (
              <div className="animate-in fade-in slide-in-from-top-4 duration-1000">
                <Hero isDarkMode={isDarkMode} />
              </div>
            )}

            <SearchBar 
              query={query} 
              setQuery={setQuery} 
              onSearch={() => handleSearch()} 
              loading={loading} 
              isDarkMode={isDarkMode} 
            />

            {movies.length === 0 && !loading && (
              <PromptSuggestions 
                prompts={randomPrompts} 
                onRefresh={refreshPrompts}
                onSelect={onPromptSelect}
                isDarkMode={isDarkMode}
              />
            )}

            {/* Film Izgarası */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
              {loading 
                ? Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className={`aspect-[2/3] rounded-[2.5rem] animate-pulse ${isDarkMode ? 'bg-slate-900' : 'bg-slate-200'}`} />
                  ))
                : movies.map((m, i) => (
                    <MovieCard key={i} movie={m} onClick={() => setSelectedMovie(m)} isDarkMode={isDarkMode} />
                  ))
              }
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 animate-in fade-in zoom-in duration-1000">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-20 animate-pulse"></div>
              <BookmarkIcon className={`w-20 h-20 relative z-10 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
            </div>
            
            <h2 className={`text-4xl font-black mb-4 tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Koleksiyon Özelliği <span className="text-indigo-500">Çok Yakında</span>
            </h2>
            
            <p className="text-slate-500 text-lg max-w-md text-center font-medium leading-relaxed">
              Kendi film listelerini oluşturma ve favorilerini kaydetme özelliği şu an geliştirme aşamasında.
            </p>
            
            <div className="mt-10 flex gap-3">
              <div className="h-1.5 w-12 bg-indigo-500 rounded-full"></div>
              <div className="h-1.5 w-3 bg-indigo-500/30 rounded-full"></div>
              <div className="h-1.5 w-3 bg-indigo-500/30 rounded-full"></div>
            </div>
          </div>
        )}
      </main>

      {/* Film Detay Modalı */}
      {selectedMovie && (
        <MovieModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
          isDarkMode={isDarkMode} 
          onToggleWatchlist={(m) => {
            const exists = watchlist.find(x => x.name === m.name);
            if (exists) setWatchlist(watchlist.filter(x => x.name !== m.name));
            else setWatchlist([...watchlist, m]);
          }}
          isInWatchlist={!!watchlist.find(m => m.name === selectedMovie.name)}
        />
      )}
    </div>
  );
}

export default App;