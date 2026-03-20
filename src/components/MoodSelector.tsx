import React from 'react';
import type { Mood } from '../types/index';

interface MoodSelectorProps {
  onMoodSearch: (query: string) => void;
  isVisible: boolean;
  isDarkMode: boolean;
}

const MOODS: Mood[] = [
  { id: 'happy', label: 'Neşeli', emoji: '😊', searchQuery: 'en neşeli komedi filmleri' },
  { id: 'sad', label: 'Duygusal', emoji: '😢', searchQuery: 'en hüzünlü dram filmleri' },
  { id: 'smart', label: 'Düşündürücü', emoji: '🧠', searchQuery: 'beyin yakan bilim kurgu filmleri' },
  { id: 'scary', label: 'Gerilim', emoji: '😱', searchQuery: 'en korkunç gerilim filmleri' },
  { id: 'action', label: 'Heyecanlı', emoji: '🔥', searchQuery: 'en aksiyon dolu macera filmleri' }
];

const MoodSelector: React.FC<MoodSelectorProps> = ({ onMoodSearch, isVisible, isDarkMode }) => {
  if (!isVisible) return null;

  return (
    <div className="flex flex-col items-center gap-6 my-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex items-center gap-3">
        <div className={`h-px w-8 bg-gradient-to-r from-transparent ${isDarkMode ? 'to-indigo-500/50' : 'to-indigo-600/30'}`}></div>
        <h3 className={`text-[10px] font-black tracking-[0.4em] uppercase ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
          RUH HALİNİ SEÇ
        </h3>
        <div className={`h-px w-8 bg-gradient-to-l from-transparent ${isDarkMode ? 'to-indigo-500/50' : 'to-indigo-600/30'}`}></div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-5xl px-4">
        {MOODS.map((mood) => (
          <button
            key={mood.id}
            onClick={() => onMoodSearch(mood.searchQuery)}
            className={`
              group relative flex items-center justify-center gap-3 px-4 py-3 
              border transition-all duration-500 rounded-2xl
              ${isDarkMode 
                ? 'bg-slate-900/40 border-slate-800 hover:border-indigo-500/50 hover:bg-indigo-600/10' 
                : 'bg-white border-slate-200 shadow-sm hover:border-indigo-600/50 hover:bg-indigo-50/50'}
            `}
          >
            <span className="text-xl leading-none flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              {mood.emoji}
            </span>
            
            <span className={`
              text-[11px] font-bold tracking-widest uppercase leading-none flex items-center
              ${isDarkMode ? 'text-slate-400 group-hover:text-white' : 'text-slate-500 group-hover:text-indigo-600'}
            `}>
              {mood.label}
            </span>
            
            {isDarkMode && (
              <div className="absolute inset-0 rounded-2xl bg-indigo-500/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;