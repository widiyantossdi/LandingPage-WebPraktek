import React, { useState, useEffect } from 'react';
import {
  RotateCcw,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Trophy,
  Brain,
  Lightbulb,
  Check,
  Eye,
  RefreshCw
} from 'lucide-react';
import { FLASHCARDS_DATA, Flashcard } from '../data/flashcardsData';

export const FlashcardsView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Local storage for mastered cards
  const [masteredIds, setMasteredIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('unugha_mastered_flashcards');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('unugha_mastered_flashcards', JSON.stringify(masteredIds));
    } catch {
      // ignore
    }
  }, [masteredIds]);

  const categories = ['Semua', 'Dasar Web', 'CSS & Layout', 'JavaScript & DOM', 'Git & Deploy'];

  const filteredCards = FLASHCARDS_DATA.filter((c) => {
    if (selectedCategory === 'Semua') return true;
    return c.category === selectedCategory;
  });

  // Ensure currentIndex stays within bounds
  const currentCard: Flashcard | undefined = filteredCards[currentIndex] || filteredCards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setShowHint(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setShowHint(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    setShowHint(false);
    const randomIndex = Math.floor(Math.random() * filteredCards.length);
    setCurrentIndex(randomIndex);
  };

  const toggleMastered = (id: number) => {
    setMasteredIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleResetProgress = () => {
    if (window.confirm('Reset status penguasaan kartu hafalan?')) {
      setMasteredIds([]);
    }
  };

  const isCurrentMastered = currentCard ? masteredIds.includes(currentCard.id) : false;
  const masteredInCurrentFilter = filteredCards.filter((c) => masteredIds.includes(c.id)).length;
  const progressPercent = Math.round((masteredInCurrentFilter / filteredCards.length) * 100) || 0;

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-850/90 dark:bg-slate-800/80 rounded-2xl border border-slate-200/90 dark:border-slate-700/80 p-4 transition-colors">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
              <Brain className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-tight">
                Kartu Kilat Konsep (Active Recall)
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Latih daya ingat konsep kunci pemrograman web sebelum ujian praktikum
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
              {masteredInCurrentFilter}/{filteredCards.length}
            </span>
            <span className="block text-[10px] text-slate-400">Dikuasai ({progressPercent}%)</span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 mt-3 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentIndex(0);
                setIsFlipped(false);
                setShowHint(false);
              }}
              className={`min-h-[32px] px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-slate-900 dark:bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Flashcard Container */}
      {currentCard ? (
        <div className="space-y-3">
          {/* Card Meta & Navigation Bar */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
            <div className="flex items-center gap-2 font-medium">
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                {currentCard.meetingRef}
              </span>
              <span>·</span>
              <span>{currentCard.category}</span>
            </div>

            <div className="flex items-center gap-1.5 font-mono">
              <span>Kartu {currentIndex + 1} dari {filteredCards.length}</span>
              <button
                type="button"
                onClick={handleShuffle}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                title="Acak Urutan Kartu"
              >
                <Shuffle className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 3D Flip Card */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full min-h-[320px] rounded-3xl p-6 sm:p-8 cursor-pointer transition-all duration-300 transform active:scale-[0.99] border relative flex flex-col justify-between shadow-sm select-none bg-white dark:bg-slate-850/95 dark:bg-slate-800/90 border-slate-200/90 dark:border-slate-700/80 hover:border-emerald-400 dark:hover:border-emerald-600"
          >
            {/* Top Card Badge */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700/80 text-slate-600 dark:text-slate-300">
                {isFlipped ? '💡 Jawaban & Penjelasan' : '❓ Pertanyaan Konsep'}
              </span>

              {isCurrentMastered && (
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-lg border border-emerald-200/60 dark:border-emerald-800/60">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Dikuasai</span>
                </span>
              )}
            </div>

            {/* Middle Content */}
            <div className="py-4 my-auto">
              {!isFlipped ? (
                /* FRONT: QUESTION */
                <div className="space-y-4">
                  <h4 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white leading-relaxed text-center">
                    {currentCard.frontQuestion}
                  </h4>

                  {currentCard.frontHint && (
                    <div className="text-center pt-2">
                      {!showHint ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowHint(true);
                          }}
                          className="inline-flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 hover:underline font-medium"
                        >
                          <Lightbulb className="w-3.5 h-3.5" />
                          <span>Buka Petunjuk (Hint)</span>
                        </button>
                      ) : (
                        <p className="text-xs text-amber-700 dark:text-amber-300/90 bg-amber-50 dark:bg-amber-950/40 p-2.5 rounded-xl border border-amber-200/70 dark:border-amber-800/60 animate-in fade-in max-w-md mx-auto">
                          💡 <strong>Petunjuk:</strong> {currentCard.frontHint}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                /* BACK: ANSWER & CODE */
                <div className="space-y-3 animate-in fade-in duration-200">
                  <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                    {currentCard.backAnswer}
                  </p>

                  {currentCard.backCodeSnippet && (
                    <div className="rounded-xl overflow-hidden bg-slate-950 border border-slate-800 p-3 text-left">
                      <pre className="text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed">
                        <code>{currentCard.backCodeSnippet}</code>
                      </pre>
                    </div>
                  )}

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200/70 dark:border-slate-800">
                    <strong>Catatan:</strong> {currentCard.explanation}
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Flip Indicator */}
            <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-700/60">
              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium inline-flex items-center gap-1">
                <RefreshCw className="w-3 h-3" />
                Klik kartu untuk {isFlipped ? 'melihat soal' : 'membalik jawaban'}
              </span>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <button
              type="button"
              onClick={handlePrev}
              className="min-h-[44px] px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1 hover:bg-slate-50 dark:hover:bg-slate-750 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            <button
              type="button"
              onClick={() => toggleMastered(currentCard.id)}
              className={`min-h-[44px] px-4 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                isCurrentMastered
                  ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                  : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-2xs'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>{isCurrentMastered ? 'Tandai Belum Paham' : 'Saya Sudah Paham!'}</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="min-h-[44px] px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1 hover:bg-slate-50 dark:hover:bg-slate-750 transition"
            >
              <span>Selanjutnya</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400">Tidak ada kartu pada kategori ini.</p>
        </div>
      )}
    </div>
  );
};
