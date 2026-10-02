import React, { useEffect } from 'react';
import { CheckCircle2, Bookmark, BookmarkCheck, Info, X } from 'lucide-react';

export interface ToastData {
  id: string;
  type: 'complete' | 'uncomplete' | 'bookmark' | 'unbookmark';
  title: string;
  message?: string;
}

interface ToastProps {
  toast: ToastData | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      onClose();
    }, 3200);

    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const getIconAndStyle = () => {
    switch (toast.type) {
      case 'complete':
        return {
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />,
          border: 'border-emerald-200 dark:border-emerald-800/80',
          bg: 'bg-white dark:bg-slate-900',
          accent: 'bg-emerald-50 dark:bg-emerald-950/60'
        };
      case 'uncomplete':
        return {
          icon: <Info className="w-5 h-5 text-slate-500 dark:text-slate-400 shrink-0" />,
          border: 'border-slate-200 dark:border-slate-800',
          bg: 'bg-white dark:bg-slate-900',
          accent: 'bg-slate-100 dark:bg-slate-800'
        };
      case 'bookmark':
        return {
          icon: <BookmarkCheck className="w-5 h-5 text-amber-500 dark:text-amber-400 shrink-0" />,
          border: 'border-amber-200 dark:border-amber-800/80',
          bg: 'bg-white dark:bg-slate-900',
          accent: 'bg-amber-50 dark:bg-amber-950/60'
        };
      case 'unbookmark':
        return {
          icon: <Bookmark className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0" />,
          border: 'border-slate-200 dark:border-slate-800',
          bg: 'bg-white dark:bg-slate-900',
          accent: 'bg-slate-100 dark:bg-slate-800'
        };
    }
  };

  const { icon, border, bg, accent } = getIconAndStyle();

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-sm pointer-events-auto transition-all animate-in fade-in slide-in-from-top-3 duration-200"
    >
      <div
        className={`flex items-start gap-3 p-3 sm:p-3.5 rounded-2xl border shadow-xl ${bg} ${border} transition-colors`}
      >
        <div className={`p-1.5 rounded-xl ${accent} flex items-center justify-center`}>
          {icon}
        </div>

        <div className="flex-1 min-w-0 pr-1">
          <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">
            {toast.title}
          </h5>
          {toast.message && (
            <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-snug">
              {toast.message}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition shrink-0"
          aria-label="Tutup notifikasi"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
