import type { Movie } from '../types';
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
      <div className={`relative w-full max-w-5xl rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-3xl ${
        isDarkMode ? 'bg-slate-900 border border-slate-800' : 'bg-white'
      }`}>
        <button 
          onClick={onClose} 
          className="absolute top-8 right-8 z-10 p-3 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
        >✕</button>
        
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
          <div className="flex gap-6 mb-8 text-sm font-bold">
            <span className="text-amber-400 flex items-center gap-1.5">
              <span className="text-lg">★</span> {movie.vote.toFixed(1)}
            </span>
            <span className="text-slate-500 tracking-widest uppercase">4K ULTRA HD</span>
          </div>
          <p className={`text-lg leading-relaxed mb-10 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            {movie.overview}
          </p>
          <button 
            onClick={() => onToggleWatchlist(movie)}
            className={`flex items-center justify-center gap-3 py-5 px-10 rounded-[1.5rem] font-bold transition-all ${
              isInWatchlist 
                ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-xl shadow-indigo-600/20'
            }`}
          >
            {isInWatchlist ? <CheckIcon className="w-6 h-6"/> : <PlusIcon className="w-6 h-6"/>}
            {isInWatchlist ? 'KİTAPLIKTA' : 'KİTAPLIĞA EKLE'}
          </button>
        </div>
      </div>
    </div>
  );
};