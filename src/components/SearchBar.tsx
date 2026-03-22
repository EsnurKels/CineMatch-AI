import { MagnifyingGlassIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
  query: string;
  setQuery: (val: string) => void;
  onSearch: () => void;
  loading: boolean;
  isDarkMode: boolean;
}

export const SearchBar = ({ query, setQuery, onSearch, loading, isDarkMode }: SearchBarProps) => (
  <div className="w-full max-w-3xl mx-auto mb-12 md:mb-20 px-4 relative group">
    <div className={`flex items-center rounded-[1.5rem] md:rounded-[2rem] border-2 transition-all duration-500 overflow-hidden ${
      isDarkMode ? 'bg-slate-900/50 border-slate-800 focus-within:border-indigo-500/50' : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50'
    }`}>
      <div className="pl-4 md:pl-6 text-indigo-500">
        {loading ? (
          <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        ) : (
          <MagnifyingGlassIcon className="w-5 h-5 md:w-6 md:h-6" />
        )}
      </div>

      <input 
        className={`flex-1 p-4 md:p-6 bg-transparent outline-none text-base md:text-lg min-w-0 transition-colors duration-300
          ${isDarkMode 
            ? 'text-white placeholder:text-slate-500' 
            : 'text-slate-900 placeholder:text-slate-400'
          }`}
        placeholder={window.innerWidth < 640 ? "Film isteğini anlat..." : "AI'ya nasıl bir film istediğini anlat..."}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
      />

      <button 
        onClick={onSearch} 
        disabled={loading} 
        className="m-2 md:mr-3 bg-indigo-600 p-3 md:p-4 rounded-xl md:rounded-2xl text-white hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-30 flex-shrink-0"
      >
        <SparklesIcon className="w-5 h-5 md:w-6 md:h-6" />
      </button>
    </div>
  </div>
);