import React from 'react';
import { Bookmark, CheckCircle2, ChevronRight, BookOpen, Clock } from 'lucide-react';
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
      className="group relative bg-white rounded-2xl border border-slate-200/90 p-4 transition-all duration-200 hover:border-emerald-300 hover:shadow-md cursor-pointer active:scale-[0.99]"
    >
      {/* Top Metadata Row: Zero-Pill Discipline with typographic separators */}
      <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-semibold text-emerald-800">
            Prt. {article.meetingNumber}
          </span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="text-slate-600">{article.category}</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="flex items-center gap-1 text-slate-500">
            <Clock className="w-3 h-3 text-slate-400" />
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
                ? 'text-amber-600 bg-amber-50'
                : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
            }`}
            title={isBookmarked ? 'Hapus bookmark' : 'Simpan materi'}
            aria-label="Bookmark materi"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
          </button>

          <button
            type="button"
            onClick={(e) => onToggleComplete(article.id, e)}
            className={`p-1.5 rounded-lg transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center ${
              isCompleted
                ? 'text-emerald-700 bg-emerald-50 font-medium'
                : 'text-slate-300 hover:text-emerald-600 hover:bg-slate-100'
            }`}
            title={isCompleted ? 'Tandai belum selesai' : 'Tandai selesai dipelajari'}
            aria-label="Status selesai"
          >
            <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'fill-emerald-600 text-white' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Heading */}
      <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug line-clamp-2 mb-1.5">
        {article.title}
      </h3>

      {/* Excerpt */}
      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mb-3 leading-relaxed">
        {article.excerpt}
      </p>

      {/* Footer Row: Author, Key Points preview, & Read Affordance */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="text-slate-500">
          Dosen: <strong className="font-medium text-slate-700">{article.author}</strong>
        </span>

        <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 group-hover:translate-x-0.5 transition-transform">
          <span>Pelajari</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </article>
  );
};
