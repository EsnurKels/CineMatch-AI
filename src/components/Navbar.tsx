import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

interface NavbarProps {
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: 'search' | 'library') => void;
  onReset: () => void;
}

export const Navbar = ({ isDarkMode, setIsDarkMode, activeTab, setActiveTab, onReset }: NavbarProps) => (
  <nav className={`fixed top-0 w-full z-50 border-b backdrop-blur-xl transition-all ${isDarkMode ? 'bg-[#0a0a0c]/80 border-slate-800' : 'bg-white/80 border-slate-200'
    }`}>
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div className="flex items-center gap-10">
        <h1 onClick={onReset} className="text-2xl font-black tracking-tighter cursor-pointer flex items-center gap-2 group">
          <span className="bg-gradient-to-br from-indigo-400 to-cyan-400 bg-clip-text text-transparent italic">CINEMATCH</span>
          <span className={`text-[8px] px-1.5 py-0.5 rounded-md border ${isDarkMode ? 'border-indigo-500/30 text-indigo-400' : 'border-slate-200 text-slate-400'}`}>AI</span>
        </h1>
        <div className="hidden md:flex gap-2">
          <button onClick={() => setActiveTab('search')} className={`px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all ${activeTab === 'search' ? 'bg-indigo-500/10 text-indigo-400' : 'text-slate-500'}`}>KEŞFET</button>
          <button onClick={() => setActiveTab('library')} className={`px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all ${activeTab === 'library' ? 'bg-indigo-500/10 text-indigo-400' : 'text-slate-500'}`}>KİTAPLIK</button>
        </div>
      </div>
      <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-3 rounded-2xl border transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800 text-indigo-400' : 'bg-white border-slate-200 text-slate-600'}`}>
        {isDarkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
      </button>
    </div>
  </nav>
);