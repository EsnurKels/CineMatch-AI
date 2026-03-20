import type { Movie } from '../types/index';

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
  isDarkMode: boolean;
}

export const MovieCard = ({ movie, onClick, isDarkMode }: MovieCardProps) => {
  return (
    <div 
      onClick={onClick} 
      className={`group cursor-pointer rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:-translate-y-3 animate-in zoom-in duration-500 ${
        isDarkMode 
          ? 'bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50' 
          : 'bg-white border border-slate-100 shadow-lg shadow-slate-200/50 hover:border-indigo-300'
      }`}
    >
      <div className="aspect-[2/3] relative overflow-hidden">
        <img 
          src={movie.poster} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
          alt={movie.name}
          loading="lazy" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-8">
          <span className="bg-white/10 backdrop-blur-xl text-white text-[10px] font-black tracking-widest uppercase px-6 py-3 rounded-full border border-white/20">
            DETAYLAR
          </span>
        </div>
      </div>
      <div className="p-6 text-center">
        <h3 className={`font-bold text-xs tracking-wide uppercase truncate ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
          {movie.name}
        </h3>
      </div>
    </div>
  );
};