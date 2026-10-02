import React, { useState } from 'react';
import { X, Check, Copy, CheckCircle2, Bookmark, Code2, ArrowLeft, Share2, Lightbulb } from 'lucide-react';
import { Article } from '../types/course';

interface ArticleModalProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
  isCompleted: boolean;
  isBookmarked: boolean;
  onToggleComplete: (id: string) => void;
  onToggleBookmark: (id: string) => void;
  onOpenInPlayground?: (code: { html: string; css: string; js: string }) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  isOpen,
  onClose,
  isCompleted,
  isBookmarked,
  onToggleComplete,
  onToggleBookmark,
  onOpenInPlayground
}) => {
  const [copiedSnippetIndex, setCopiedSnippetIndex] = useState<number | null>(null);
  const [copyShareStatus, setCopyShareStatus] = useState(false);

  if (!isOpen || !article) return null;

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippetIndex(index);
    setTimeout(() => setCopiedSnippetIndex(null), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: `Materi Kuliah Web Programming SI UNUGHA: ${article.title}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${article.title} - ${window.location.href}`);
      setCopyShareStatus(true);
      setTimeout(() => setCopyShareStatus(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-900/60 backdrop-blur-xs overflow-hidden">
      {/* Container */}
      <div className="relative w-full h-full max-w-2xl mx-auto bg-white flex flex-col shadow-2xl md:my-auto md:h-[94vh] md:rounded-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Top Header Bar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="min-h-[44px] min-w-[44px] -ml-2 rounded-xl flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
              aria-label="Tutup materi"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="text-left">
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                Pertemuan {article.meetingNumber} · {article.category}
              </span>
              <span className="text-xs text-slate-500">
                {article.readingTime} · {article.publishedDate}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleShare}
              className="min-h-[40px] min-w-[40px] rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition flex items-center justify-center"
              title="Bagikan materi"
            >
              {copyShareStatus ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`min-h-[40px] min-w-[40px] rounded-lg transition flex items-center justify-center ${
                isBookmarked
                  ? 'text-amber-600 bg-amber-50'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title="Bookmark artikel"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="min-h-[40px] min-w-[40px] rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition flex items-center justify-center"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
          {/* Title & Excerpt */}
          <div className="space-y-3">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
              {article.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {article.excerpt}
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs text-slate-500 border-b border-slate-100 pb-3">
              <span>Pengampu: <strong className="text-slate-800">{article.author}</strong></span>
              <span aria-hidden="true">·</span>
              <span>Prodi Sistem Informasi UNUGHA</span>
            </div>
          </div>

          {/* Key Takeaways Box */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4">
            <h2 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-emerald-700" />
              Poin Kunci Pembelajaran
            </h2>
            <ul className="space-y-1.5 text-xs sm:text-sm text-emerald-950">
              {article.keyTakeaways.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Sections */}
          <div className="space-y-8">
            {article.sections.map((section, sIdx) => (
              <section key={sIdx} className="space-y-3">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {section.heading}
                </h3>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line">
                  {section.body}
                </p>

                {section.bulletPoints && (
                  <ul className="space-y-2 pl-2">
                    {section.bulletPoints.map((b, bIdx) => (
                      <li key={bIdx} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                        <span className="text-emerald-700 font-bold shrink-0 mt-0.5">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Code Snippet Box */}
                {section.codeSnippet && (
                  <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 my-3">
                    <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border-b border-slate-800 text-xs">
                      <span className="text-slate-400 font-mono">
                        {section.codeSnippet.language}
                      </span>
                      <button
                        onClick={() => handleCopyCode(section.codeSnippet!.code, sIdx)}
                        className="flex items-center gap-1.5 text-[11px] text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-md transition"
                      >
                        {copiedSnippetIndex === sIdx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 font-medium">Tersalin!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Salin Kode</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-3 text-xs sm:text-sm text-slate-100 font-mono overflow-x-auto leading-relaxed">
                      <code>{section.codeSnippet.code}</code>
                    </pre>
                    {section.codeSnippet.explanation && (
                      <div className="px-3 py-2 bg-slate-900/80 border-t border-slate-800/80 text-[11px] text-slate-400 italic">
                        {section.codeSnippet.explanation}
                      </div>
                    )}
                  </div>
                )}

                {/* Tips Callout */}
                {section.tips && (
                  <div className="bg-amber-50/70 border-l-4 border-amber-500 rounded-r-xl p-3 text-xs sm:text-sm text-amber-950 flex items-start gap-2">
                    <span className="font-bold shrink-0">💡 Catatan Dosen:</span>
                    <span>{section.tips}</span>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Interactive Playground CTA if available */}
          {article.exerciseInitialCode && onOpenInPlayground && (
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-900 to-slate-900 text-white space-y-3 shadow-md">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-emerald-400" />
                <h4 className="font-bold text-sm sm:text-base">Latihan Praktikum Mandiri</h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-200">
                {article.exercisePrompt || 'Uji langsung contoh kode di atas di browser Anda tanpa perlu install software.'}
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenInPlayground(article.exerciseInitialCode!);
                }}
                className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <Code2 className="w-4 h-4" />
                <span>Buka & Jalankan di Code Lab</span>
              </button>
            </div>
          )}
        </div>

        {/* Sticky Bottom Actions Bar */}
        <div className="sticky bottom-0 z-20 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 flex items-center justify-between gap-3">
          <button
            onClick={() => onToggleComplete(article.id)}
            className={`flex-1 min-h-[46px] rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition active:scale-[0.98] ${
              isCompleted
                ? 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
                : 'bg-emerald-700 text-white hover:bg-emerald-800 shadow-sm'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>
              {isCompleted ? '✓ Sudah Dipelajari' : 'Tandai Selesai Belajar'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
