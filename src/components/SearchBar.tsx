import { MagnifyingGlassIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
  query: string;
  setQuery: (val: string) => void;
  onSearch: () => void;
  loading: boolean;
  isDarkMode: boolean;
}

export const SearchBar = ({ query, setQuery, onSearch, loading, isDarkMode }: SearchBarProps) => (
  <div className="max-w-3xl mx-auto mb-20 relative group">
    <div className={`flex items-center rounded-[2rem] border-2 transition-all duration-500 ${
      isDarkMode ? 'bg-slate-900/50 border-slate-800 focus-within:border-indigo-500/50' : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50'
    }`}>
      <div className="pl-6 text-indigo-500">
        {loading ? <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" /> : <MagnifyingGlassIcon className="w-6 h-6" />}
      </div>
      <input 
        className={`flex-1 p-6 bg-transparent outline-none text-lg ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
        placeholder="AI'ya nasıl bir film istediğini anlat..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
      />
      <button onClick={onSearch} disabled={loading} className="mr-3 bg-indigo-600 p-4 rounded-2xl text-white hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-30">
        <SparklesIcon className="w-6 h-6" />
      </button>
    </div>
  </div>
);