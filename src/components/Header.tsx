import React from 'react';
import { Smartphone, Monitor, Sparkles, CheckCircle2, Moon, Sun, Zap, Flame } from 'lucide-react';
import { COURSE_INFO } from '../data/courseData';

interface HeaderProps {
  completedArticlesCount: number;
  totalArticlesCount: number;
  isMobileFrame: boolean;
  setIsMobileFrame: (val: boolean) => void;
  onOpenQuiz: () => void;
  onOpenChallenge?: () => void;
  streakCount?: number;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  completedArticlesCount,
  totalArticlesCount,
  isMobileFrame,
  setIsMobileFrame,
  onOpenQuiz,
  onOpenChallenge,
  streakCount = 1,
  isDarkMode,
  toggleDarkMode
}) => {
  const progressPercent = Math.round((completedArticlesCount / totalArticlesCount) * 100);

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark with academic green touch */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
            SI
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight leading-tight flex items-center gap-1.5">
              <span>Web Programming</span>
              <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 tracking-normal hidden xs:inline">
                UNUGHA
              </span>
            </h1>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
              Sistem Informasi · Kampus Kesugihan Cilacap
            </p>
          </div>
        </div>

        {/* Zone 3: Actions & Ergonomic Toggles */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Tantangan Hari Ini button */}
          {onOpenChallenge && (
            <button
              type="button"
              onClick={onOpenChallenge}
              className="min-h-[38px] px-2.5 sm:px-3 rounded-xl text-xs font-semibold text-amber-900 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 dark:hover:bg-amber-900/60 border border-amber-200/80 dark:border-amber-800/60 transition flex items-center gap-1.5 shrink-0 active:scale-95 shadow-2xs"
              title="Tantangan Koding Hari Ini (Batas Waktu & Skor)"
            >
              <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span className="hidden xs:inline">Tantangan</span>
              {streakCount > 0 && (
                <span className="font-mono text-[10px] bg-amber-200/80 dark:bg-amber-800/80 px-1 py-0.2 rounded text-amber-950 dark:text-amber-200 font-bold">
                  🔥{streakCount}
                </span>
              )}
            </button>
          )}

          {/* Dark Mode Toggle */}
          <button
            type="button"
            onClick={toggleDarkMode}
            className="min-h-[38px] min-w-[38px] p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700/80 transition flex items-center justify-center shrink-0 active:scale-95 shadow-2xs"
            aria-label={isDarkMode ? 'Beralih ke mode terang' : 'Beralih ke mode gelap'}
            title={isDarkMode ? 'Mode Terang (Light Mode)' : 'Mode Gelap (Dark Mode)'}
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-180 duration-300" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700 animate-in spin-in-180 duration-300" />
            )}
          </button>

          {/* Quiz Button */}
          <button
            onClick={onOpenQuiz}
            className="min-h-[38px] px-2.5 sm:px-3 rounded-xl text-xs font-medium text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200/60 dark:border-emerald-800/60 transition flex items-center gap-1.5 shrink-0"
            title="Uji Pemahaman Web Programming"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden sm:inline">Kuis</span>
          </button>

          {/* Progress Indicator */}
          <div className="flex items-center gap-1 text-[11px] font-medium text-slate-600 dark:text-slate-300 bg-slate-100/90 dark:bg-slate-800/90 px-2 sm:px-2.5 py-1.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="tabular-nums font-mono font-semibold text-slate-900 dark:text-white">
              {completedArticlesCount}/{totalArticlesCount}
            </span>
          </div>

          {/* Desktop Frame Toggle */}
          <div className="hidden lg:flex items-center p-0.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
            <button
              onClick={() => setIsMobileFrame(true)}
              className={`p-1.5 rounded-lg text-xs transition ${
                isMobileFrame
                  ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-xs font-medium'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
              title="Mode Tampilan Mobile Phone"
            >
              <Smartphone className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsMobileFrame(false)}
              className={`p-1.5 rounded-lg text-xs transition ${
                !isMobileFrame
                  ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-xs font-medium'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
              title="Mode Responsif Penuh"
            >
              <Monitor className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Micro Progress Bar on Top */}
      <div className="w-full bg-slate-100 dark:bg-slate-800 h-0.5">
        <div
          className="bg-emerald-600 h-0.5 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </header>
  );
};
