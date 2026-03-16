import { SparklesIcon } from '@heroicons/react/24/outline';

export const Hero = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <div className="text-center mb-16 animate-in zoom-in duration-700">
    <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-indigo-500/10 border border-indigo-500/20">
      <SparklesIcon className="w-4 h-4 text-indigo-400" />
      <span className="text-[10px] font-black text-indigo-400 tracking-[0.2em] uppercase">
        Yapay Zeka Destekli Rehber
      </span>
    </div>
    <h1 className={`text-5xl md:text-7xl font-black tracking-tighter mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
      Sadece <span className="text-indigo-500">Hayal Et</span> ve İzle.
    </h1>
    <p className="text-slate-500 text-lg max-w-xl mx-auto font-medium leading-relaxed">
      Ruh haline en uygun filmleri saniyeler içinde bulmak için AI'ya bir cümle yazman yeterli.
    </p>
  </div>
);