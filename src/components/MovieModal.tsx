import type { Movie } from '../types';
import { XMarkIcon } from '@heroicons/react/24/outline'; // Bunu ekle
import { PlusIcon, CheckIcon } from '@heroicons/react/24/outline';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
  isDarkMode: boolean;
  onToggleWatchlist: (movie: Movie) => void;
  isInWatchlist: boolean;
}

export const MovieModal = ({ movie, onClose, isDarkMode, onToggleWatchlist, isInWatchlist }: MovieModalProps) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#0a0a0c]/95 backdrop-blur-2xl animate-in fade-in duration-500">
      <div className={`relative w-full max-w-5xl rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-3xl ${isDarkMode ? 'bg-slate-900 border border-slate-800' : 'bg-white'
        }`}>
        <button
          onClick={onClose}
          className={`
            absolute top-6 right-6 z-[120] 
            w-12 h-12 rounded-full 
            flex items-center justify-center 
            transition-all duration-300 group
            ${isDarkMode
                      ? 'bg-slate-800/60 border border-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-white'
                      : 'bg-white/70 border border-slate-200 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600'
                    }
            backdrop-blur-md active:scale-95 shadow-lg
          `}
        >
          <XMarkIcon className="w-6 h-6 transition-transform group-hover:rotate-90" />
        </button>

        <div className="w-full md:w-1/2 h-[400px] md:h-auto overflow-hidden">
          <img src={movie.poster} className="w-full h-full object-cover" alt={movie.name} />
        </div>

        <div className="p-10 md:p-16 flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-indigo-500"></div>
            <span className="text-indigo-400 font-bold tracking-widest text-xs uppercase">AI SEÇİMİ</span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-black mb-6 tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {movie.name}
          </h2>
          <div className="flex items-center gap-6 mb-8">
            <div className="flex items-center gap-1.5 px-3 py-1">
              <span className="text-amber-400 text-lg leading-none">★</span>
              <span className="text-amber-400 font-bold text-sm leading-none">
                {movie.vote.toFixed(1)}
              </span>
            </div>

            <div className="h-4 w-px bg-slate-800"></div>

            <span className={`text-[11px] font-black tracking-[0.2em] uppercase leading-none ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
              4K ULTRA HD
            </span>
          </div>
          <div className={`
            overflow-y-auto pr-4 mb-8 custom-scrollbar
            max-h-[200px] md:max-h-[300px] 
            ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}
          `}>
            <p className="text-base md:text-lg leading-relaxed font-medium">
              {movie.overview || "Özet bulunamadı."}
            </p>
          </div>
          <button
            onClick={() => onToggleWatchlist(movie)}
            className={`flex items-center justify-center gap-3 py-5 px-10 rounded-[1.5rem] font-bold transition-all ${isInWatchlist
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
  );
};