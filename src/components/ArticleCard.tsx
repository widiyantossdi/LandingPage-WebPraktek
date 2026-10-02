import React from 'react';
import { Bookmark, CheckCircle2, ChevronRight, Clock } from 'lucide-react';
import { Article } from '../types/course';

interface ArticleCardProps {
  article: Article;
  isCompleted: boolean;
  isBookmarked: boolean;
  onToggleComplete: (id: string, e: React.MouseEvent) => void;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onOpenArticle: (article: Article) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  isCompleted,
  isBookmarked,
  onToggleComplete,
  onToggleBookmark,
  onOpenArticle
}) => {
  return (
    <article
      onClick={() => onOpenArticle(article)}
      className="group relative bg-white dark:bg-slate-850/90 dark:bg-slate-800/80 rounded-2xl border border-slate-200/90 dark:border-slate-700/80 p-4 transition-all duration-200 hover:border-emerald-300 dark:hover:border-emerald-500 hover:shadow-md cursor-pointer active:scale-[0.99]"
    >
      {/* Top Metadata Row: Zero-Pill Discipline with typographic separators */}
      <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-semibold text-emerald-800 dark:text-emerald-400">
            Prt. {article.meetingNumber}
          </span>
          <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
          <span className="text-slate-600 dark:text-slate-300">{article.category}</span>
          <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
          <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
            <Clock className="w-3 h-3 text-slate-400 dark:text-slate-500" />
            <span>{article.readingTime}</span>
          </span>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={(e) => onToggleBookmark(article.id, e)}
            className={`p-1.5 rounded-lg transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center ${
              isBookmarked
                ? 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400'
                : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60'
            }`}
            title={isBookmarked ? 'Hapus bookmark' : 'Simpan materi'}
            aria-label="Bookmark materi"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
          </button>

          <button
            type="button"
            onClick={(e) => onToggleComplete(article.id, e)}
            className={`p-1.5 rounded-lg transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center ${
              isCompleted
                ? 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400'
                : 'text-slate-300 dark:text-slate-600 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-700/60'
            }`}
            title={isCompleted ? 'Tandai belum selesai' : 'Tandai selesai dibaca'}
            aria-label="Selesai dibaca"
          >
            <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'fill-emerald-100 dark:fill-emerald-900/60' : ''}`} />
          </button>
        </div>
      </div>

      {/* Article Title */}
      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors leading-snug">
        {article.title}
      </h3>

      {/* Excerpt */}
      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-1.5 leading-relaxed">
        {article.excerpt}
      </p>

      {/* Bottom Key Takeaway & Read CTA */}
      <div className="mt-3.5 pt-2.5 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 overflow-hidden">
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <span className="text-[10px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-200/60 dark:border-slate-700/60 truncate max-w-[220px]">
              {article.keyTakeaways[0]}
            </span>
          )}
        </div>

        <div className="flex items-center text-xs font-semibold text-emerald-700 dark:text-emerald-400 shrink-0 group-hover:translate-x-0.5 transition-transform">
          <span>Baca</span>
          <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
        </div>
      </div>
    </article>
  );
};
