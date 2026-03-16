import type { ElementType } from 'react';
import { ArrowPathIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface Prompt {
  title: string;
  text: string;
  icon: ElementType;
}

interface PromptSuggestionsProps {
  prompts: Prompt[];
  onRefresh: () => void;
  onSelect: (text: string) => void;
  isDarkMode: boolean;
}

export const PromptSuggestions = ({ prompts, onRefresh, onSelect, isDarkMode }: PromptSuggestionsProps) => {
  return (
    <div className="mt-16 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      <div className="flex items-center justify-between mb-8 max-w-5xl mx-auto px-4 text-white">
        <h2 className="text-slate-500 font-bold tracking-[0.2em] uppercase text-[10px]">İlham Al</h2>
        <button onClick={onRefresh} className="text-indigo-400 text-xs font-bold hover:text-indigo-300 transition-colors flex items-center gap-2 group">
          <ArrowPathIcon className="w-3 h-3 group-active:rotate-180 transition-transform duration-500" />
          YENİLE
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto px-4">
        {prompts.map((item, i) => (
          <button
            key={i}
            onClick={() => onSelect(item.text)}
            className="group perspective-1000 h-52 w-full cursor-pointer outline-none"
          >
            <div className="relative w-full h-full transition-all duration-700 preserve-3d group-hover:[transform:rotateY(180deg)]">
              
              {/* ÖN YÜZ - Metin artık burada ve her zaman görünüyor */}
              <div className={`absolute inset-0 backface-hidden flex flex-col items-center justify-center p-6 rounded-[2.5rem] border border-dashed transition-all duration-500 ${
                isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="p-3 rounded-2xl bg-indigo-500/10 mb-4">
                  <item.icon className="w-6 h-6 text-indigo-500" />
                </div>
                <h3 className="text-[9px] font-black tracking-[0.2em] uppercase text-indigo-500/60 mb-3">
                  {item.title}
                </h3>
                <p className={`text-sm font-bold leading-relaxed text-center ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                  "{item.text}"
                </p>
              </div>

              {/* ARKA YÜZ - Sadece Beyaz Arka Plan ve Ara Butonu */}
              <div className={`absolute inset-0 backface-hidden [transform:rotateY(180deg)] flex flex-col items-center justify-center p-8 text-center rounded-[2.5rem] shadow-2xl bg-white text-slate-900`}>
                <div className="bg-indigo-600 p-4 rounded-full mb-3 shadow-lg shadow-indigo-600/40">
                    <MagnifyingGlassIcon className="w-6 h-6 text-white" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">
                  ŞİMDİ ARA
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};