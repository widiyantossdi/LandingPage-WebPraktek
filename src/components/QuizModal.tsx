import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, HelpCircle, RotateCcw, Trophy, ArrowRight } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/courseData';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  if (!isOpen) return null;

  const currentQ = QUIZ_QUESTIONS[currentIdx];
  const hasAnsweredCurrent = selectedAnswers[currentQ.id] !== undefined;
  const isCorrect = selectedAnswers[currentQ.id] === currentQ.correctIndex;

  const handleSelectOption = (optionIdx: number) => {
    if (hasAnsweredCurrent) return; // prevent changing
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQ.id]: optionIdx
    });
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setShowResult(false);
  };

  const totalCorrect = QUIZ_QUESTIONS.filter(
    (q) => selectedAnswers[q.id] === q.correctIndex
  ).length;

  const score = Math.round((totalCorrect / QUIZ_QUESTIONS.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white rounded-3xl p-5 sm:p-6 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-emerald-50 text-emerald-700">
              <HelpCircle className="w-4 h-4" />
            </span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Kuis Cepat Pemrograman Web
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
            aria-label="Tutup kuis"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!showResult ? (
          <div className="py-4 space-y-4">
            {/* Progress indicator */}
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-emerald-800">
                Soal {currentIdx + 1} dari {QUIZ_QUESTIONS.length}
              </span>
              <span className="tabular-nums font-mono">
                {Math.round(((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100)}%
              </span>
            </div>

            {/* Question Text */}
            <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </p>

            {/* Options list */}
            <div className="space-y-2 pt-1">
              {currentQ.options.map((option, optIdx) => {
                const isSelected = selectedAnswers[currentQ.id] === optIdx;
                const isThisTheCorrectAnswer = optIdx === currentQ.correctIndex;

                let btnStyle = 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50 text-slate-800';
                if (hasAnsweredCurrent) {
                  if (isThisTheCorrectAnswer) {
                    btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-medium';
                  } else if (isSelected) {
                    btnStyle = 'border-rose-400 bg-rose-50 text-rose-950';
                  } else {
                    btnStyle = 'border-slate-200 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleSelectOption(optIdx)}
                    disabled={hasAnsweredCurrent}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition flex items-center justify-between gap-3 min-h-[44px] ${btnStyle}`}
                  >
                    <span>{option}</span>
                    {hasAnsweredCurrent && isThisTheCorrectAnswer && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                    {hasAnsweredCurrent && isSelected && !isThisTheCorrectAnswer && (
                      <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box after answer */}
            {hasAnsweredCurrent && (
              <div
                className={`p-3 rounded-xl text-xs leading-relaxed animate-in fade-in ${
                  isCorrect
                    ? 'bg-emerald-50/80 text-emerald-950 border border-emerald-200'
                    : 'bg-amber-50/80 text-amber-950 border border-amber-200'
                }`}
              >
                <span className="font-bold block mb-1">
                  {isCorrect ? 'Benar Sekali!' : 'Perlu Diingat:'}
                </span>
                <p>{currentQ.explanation}</p>
              </div>
            )}

            {/* Next button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleNext}
                disabled={!hasAnsweredCurrent}
                className={`w-full min-h-[44px] py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition ${
                  hasAnsweredCurrent
                    ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>
                  {currentIdx === QUIZ_QUESTIONS.length - 1 ? 'Lihat Hasil Nilai' : 'Soal Berikutnya'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Final Result Screen */
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-xs">
              <Trophy className="w-8 h-8 text-emerald-700" />
            </div>

            <div>
              <span className="text-3xl font-extrabold font-mono text-emerald-800">
                {score}
                <span className="text-base text-slate-400 font-sans font-normal"> / 100</span>
              </span>
              <p className="text-sm font-semibold text-slate-800 mt-1">
                {score >= 80
                  ? 'Luar Biasa! Pemahaman Web Sangat Baik'
                  : score >= 60
                  ? 'Bagus! Tetap Asah Latihan Praktikum Anda'
                  : 'Pelajari Lagi Modul Pertemuan 1-7 ya!'}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                {totalCorrect} dari {QUIZ_QUESTIONS.length} pertanyaan dijawab dengan benar.
              </p>
            </div>

            <div className="pt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 min-h-[44px] py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ulangi Kuis</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex-1 min-h-[44px] py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold"
              >
                Selesai
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
