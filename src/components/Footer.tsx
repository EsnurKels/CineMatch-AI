export const Footer = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <footer className={`mt-20 py-12 border-t transition-colors duration-700 ${isDarkMode ? 'border-slate-800/50' : 'border-slate-200'}`}>
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex flex-col items-center md:items-start gap-2">
        <span className={`text-[10px] font-black tracking-[0.3em] uppercase ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
          © 2026 CINEMATCH AI
        </span>
        <p className={`text-[11px] font-medium ${isDarkMode ? 'text-slate-600' : 'text-slate-500'}`}>
          Designed and Developed by <span className={isDarkMode ? 'text-slate-400' : 'text-slate-700'}>Esmanur Keleş</span>
        </p>
      </div>
      <div className="flex items-center gap-8">
        <a
          href="https://github.com/EsnurKels/cinematch-ai"
          target="_blank"
          rel="noopener noreferrer"
          className={`text-[10px] font-bold tracking-widest uppercase transition-colors ${isDarkMode ? 'text-slate-500 hover:text-indigo-400' : 'text-slate-400 hover:text-indigo-600'}`}
        >
          MIT LICENSE
        </a>
        <div className={`h-4 w-px ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`}></div>
        <span className={`text-[10px] font-bold tracking-widest uppercase ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>
          v2.0.0
        </span>
      </div>
    </div>
  </footer>
);