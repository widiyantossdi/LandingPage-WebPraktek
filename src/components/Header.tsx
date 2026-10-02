import React from 'react';
import { Smartphone, Monitor, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';
import { COURSE_INFO } from '../data/courseData';

interface HeaderProps {
  completedArticlesCount: number;
  totalArticlesCount: number;
  isMobileFrame: boolean;
  setIsMobileFrame: (val: boolean) => void;
  onOpenQuiz: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  completedArticlesCount,
  totalArticlesCount,
  isMobileFrame,
  setIsMobileFrame,
  onOpenQuiz
}) => {
  const progressPercent = Math.round((completedArticlesCount / totalArticlesCount) * 100);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark with academic green touch */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
            SI
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-tight flex items-center gap-1.5">
              <span>Web Programming</span>
              <span className="text-[11px] font-semibold text-emerald-700 tracking-normal hidden xs:inline">
                UNUGHA
              </span>
            </h1>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Sistem Informasi · Kampus Kesugihan Cilacap
            </p>
          </div>
        </div>

        {/* Zone 3: Actions & Ergonomic Toggles */}
        <div className="flex items-center gap-2">
          {/* Quiz Button */}
          <button
            onClick={onOpenQuiz}
            className="min-h-[40px] px-3 rounded-lg text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/60 transition flex items-center gap-1.5 shrink-0"
            title="Uji Pemahaman Web Programming"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden xs:inline">Kuis Kilat</span>
          </button>

          {/* Progress Indicator */}
          <div className="flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-100/90 px-2.5 py-1.5 rounded-lg border border-slate-200/60">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="tabular-nums font-mono font-semibold text-slate-900">
              {completedArticlesCount}/{totalArticlesCount}
            </span>
            <span className="text-slate-400 hidden xs:inline">modul</span>
          </div>

          {/* Desktop Frame Toggle (Allows testing mobile preview or fluid wide view) */}
          <div className="hidden lg:flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-200/60">
            <button
              onClick={() => setIsMobileFrame(true)}
              className={`p-1.5 rounded-md text-xs transition ${
                isMobileFrame
                  ? 'bg-white text-emerald-700 shadow-xs font-medium'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Mode Tampilan Mobile Phone"
            >
              <Smartphone className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsMobileFrame(false)}
              className={`p-1.5 rounded-md text-xs transition ${
                !isMobileFrame
                  ? 'bg-white text-emerald-700 shadow-xs font-medium'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Mode Responsif Penuh"
            >
              <Monitor className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Micro Progress Bar on Top */}
      <div className="w-full bg-slate-100 h-0.5">
        <div
          className="bg-emerald-600 h-0.5 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </header>
  );
};
