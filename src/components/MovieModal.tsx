import { useState, useEffect } from "react";
import type { Movie, WatchProvider } from '../types';
import { XMarkIcon, PlusIcon, CheckIcon } from '@heroicons/react/24/outline';
import { getMovieWatchProviders } from '../services/tmdb';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
  isDarkMode: boolean;
  onToggleWatchlist: (movie: Movie) => void;
  isInWatchlist: boolean;
}

export const MovieModal = ({ movie, onClose, isDarkMode, onToggleWatchlist, isInWatchlist }: MovieModalProps) => {
  const [platforms, setPlatforms] = useState<WatchProvider[]>([]);

  useEffect(() => {
    const fetchProviders = async () => {
      if (movie.id) {
        const data = await getMovieWatchProviders(movie.id);
        if (data && data.flatrate) {
          setPlatforms(data.flatrate as WatchProvider[]);
        }
      }
    };
    fetchProviders();
  }, [movie.id]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-[#0a0a0c]/90 backdrop-blur-xl animate-in fade-in duration-500"
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-4xl h-full max-h-[600px] md:h-[600px] rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl ${
          isDarkMode ? 'bg-[#111114] border border-white/5' : 'bg-white'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-[130] w-10 h-10 rounded-full flex items-center justify-center bg-black/20 hover:bg-black/40 text-white backdrop-blur-md transition-all active:scale-95"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <div className="w-full md:w-[40%] h-[200px] md:h-full flex-shrink-0">
          <img src={movie.poster} className="w-full h-full object-cover" alt={movie.name} />
        </div>

        <div className="flex-1 p-8 md:p-12 flex flex-col min-h-0">
          <div className="flex-shrink-0">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-6 bg-indigo-500"></div>
              <span className="text-indigo-400 font-bold tracking-widest text-[10px] uppercase">AI SEÇİMİ</span>
            </div>

            <h2 className={`text-2xl md:text-4xl font-black mb-4 tracking-tight leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {movie.name}
            </h2>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1.5 px-2 py-1">
                <span className="text-amber-400 text-sm">★</span>
                <span className="text-amber-400 font-bold text-xs">{movie.vote.toFixed(1)}</span>
              </div>
              <span className="text-slate-500 text-[10px] font-black tracking-widest uppercase">4K ULTRA HD</span>
            </div>
          </div>

          <div className={`flex-grow overflow-y-auto custom-scrollbar mb-8 pr-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            <p className="text-sm md:text-base leading-relaxed">
              {movie.overview || "Özet bulunamadı."}
            </p>
          </div>

          <div className="flex-shrink-0 mt-auto">
            {platforms.length > 0 && (
              <div className="mb-8">
                <p className="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase mb-4">ŞİMDİ İZLE</p>
                <div className="flex flex-wrap gap-4">
                  {platforms.map((p: WatchProvider) => (
                    <div key={p.provider_id} title={p.provider_name} className="group relative">
                      <div className="w-11 h-11 rounded-xl overflow-hidden border border-white/10 shadow-lg transition-all duration-300">
                        <img
                          src={`https://image.tmdb.org/t/p/original${p.logo_path}`}
                          alt={p.provider_name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => onToggleWatchlist(movie)}
              className={`w-full flex items-center justify-center gap-3 py-5 px-10 rounded-[1.5rem] font-bold transition-all active:scale-95 text-base md:text-lg ${
                isInWatchlist
                  ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                  : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-xl shadow-indigo-600/20'
              }`}
            >
              {isInWatchlist ? <CheckIcon className="w-6 h-6" /> : <PlusIcon className="w-6 h-6" />}
              {isInWatchlist ? 'KİTAPLIKTA' : 'KİTAPLIĞA EKLE'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};