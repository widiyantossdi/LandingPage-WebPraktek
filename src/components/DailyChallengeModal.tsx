import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Zap,
  Timer,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  Trophy,
  Flame,
  Lightbulb,
  Code2,
  Copy,
  Check,
  ChevronRight,
  Eye,
  Award
} from 'lucide-react';
import { DAILY_CHALLENGES_DATA, DailyChallenge } from '../data/dailyChallengesData';

interface DailyChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (score: number, title: string) => void;
  streakCount: number;
}

export const DailyChallengeModal: React.FC<DailyChallengeModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  streakCount
}) => {
  // Determine today's challenge by day of month
  const todayIdx = new Date().getDate() % DAILY_CHALLENGES_DATA.length;
  const [activeChallengeIdx, setActiveChallengeIdx] = useState<number>(todayIdx);
  const challenge = DAILY_CHALLENGES_DATA[activeChallengeIdx];

  const [code, setCode] = useState<string>(challenge.initialCode);
  const [timeLeft, setTimeLeft] = useState<number>(challenge.timeLimitSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isTimeOut, setIsTimeOut] = useState<boolean>(false);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [earnedScore, setEarnedScore] = useState<number>(0);

  // Sync state when challenge changes
  useEffect(() => {
    if (isOpen) {
      setCode(challenge.initialCode);
      setTimeLeft(challenge.timeLimitSeconds);
      setIsRunning(true);
      setHasStarted(true);
      setIsFinished(false);
      setIsTimeOut(false);
      setShowSolution(false);
      setShowHint(false);
      setEarnedScore(0);
    } else {
      setIsRunning(false);
    }
  }, [isOpen, activeChallengeIdx]);

  // Countdown Timer
  useEffect(() => {
    let interval: any = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsRunning(false);
            setIsTimeOut(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  if (!isOpen) return null;

  // Criteria real-time evaluation
  const evaluatedCriteria = challenge.criteria.map((c) => ({
    ...c,
    passed: c.check(code)
  }));

  const passedCount = evaluatedCriteria.filter((c) => c.passed).length;
  const totalCriteria = evaluatedCriteria.length;
  const allPassed = passedCount === totalCriteria;

  // Calculate live score
  const timeBonus = Math.round(timeLeft * 0.5);
  const totalPossibleScore = challenge.basePoints + timeBonus;

  const handleSubmit = () => {
    if (!allPassed) {
      alert('Masih ada kriteria yang belum terpenuhi. Periksa daftar kriteria di bawah!');
      return;
    }

    setIsRunning(false);
    setIsFinished(true);
    const finalScore = challenge.basePoints + timeBonus;
    setEarnedScore(finalScore);
    onSuccess(finalScore, challenge.title);
  };

  const handleReset = () => {
    setCode(challenge.initialCode);
    setTimeLeft(challenge.timeLimitSeconds);
    setIsRunning(true);
    setIsFinished(false);
    setIsTimeOut(false);
    setShowSolution(false);
    setShowHint(false);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs">
      <div className="w-full max-w-xl max-h-[92vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 transition-colors">
        
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50/70 dark:bg-slate-850/80">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400">
              <Zap className="w-5 h-5 fill-amber-500 text-amber-500" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                  {challenge.dayTitle}
                </span>
                <span className="text-xs text-slate-300 dark:text-slate-600">·</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                  {challenge.topic}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-tight">
                {challenge.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Timer Badge */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition ${
                timeLeft < 45 && !isFinished
                  ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-300 text-rose-600 animate-pulse'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
              }`}
            >
              <Timer className="w-3.5 h-3.5" />
              <span>{formatTime(timeLeft)}</span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Tutup tantangan"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          
          {/* Streak & Points Potential Bar */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200/80 dark:border-amber-800/60 rounded-2xl p-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-orange-500/20 text-orange-600 dark:text-orange-400 font-bold flex items-center gap-1">
                <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
                <span>Streak: {streakCount} Hari</span>
              </span>
              <span className="text-[11px] text-slate-600 dark:text-slate-400 hidden xs:inline">
                Selesaikan sebelum waktu habis!
              </span>
            </div>

            <div className="text-right font-mono">
              <span className="text-amber-800 dark:text-amber-300 font-bold">
                +{totalPossibleScore} Poin
              </span>
              <span className="block text-[10px] text-slate-500 dark:text-slate-400">
                (Dasar {challenge.basePoints} + Bonus Waktu {timeBonus})
              </span>
            </div>
          </div>

          {/* Result or Time Out Screen */}
          {isFinished ? (
            <div className="py-6 px-4 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-3xl text-center space-y-3 animate-in zoom-in-95">
              <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mx-auto shadow-sm">
                <Trophy className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-emerald-900 dark:text-emerald-200">
                Tantangan Berhasil Dituntaskan!
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
                Luar biasa! Anda menyelesaikan tantangan koding harian ini dengan sisa waktu{' '}
                <strong className="font-mono text-emerald-800 dark:text-emerald-300">{formatTime(timeLeft)}</strong>.
              </p>

              <div className="inline-flex items-center gap-2 p-2 px-4 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 shadow-xs">
                <Award className="w-5 h-5 text-amber-500" />
                <span className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                  +{earnedScore} XP Mahasiswa Ditambahkan
                </span>
              </div>

              <div className="pt-2 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs"
                >
                  Tutup & Lanjutkan Belajar
                </button>
              </div>
            </div>
          ) : isTimeOut ? (
            <div className="py-5 px-4 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 rounded-2xl text-center space-y-2">
              <AlertCircle className="w-8 h-8 text-rose-500 mx-auto" />
              <h4 className="text-sm font-bold text-rose-900 dark:text-rose-200">
                Waktu Pengerjaan Telah Habis!
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Jangan berkecil hati. Anda dapat mengulang tantangan atau mempelajari kunci solusinya.
              </p>
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Ulangi Tantangan</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowSolution(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold"
                >
                  Lihat Kunci Solusi
                </button>
              </div>
            </div>
          ) : null}

          {/* Problem Statement */}
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Instruksi Soal:
            </h4>
            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium bg-slate-50 dark:bg-slate-850 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800">
              {challenge.description}
            </p>
          </div>

          {/* Live Criteria Checklist */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-bold uppercase tracking-wider">Kriteria Pengujian:</span>
              <span className="font-mono font-semibold text-emerald-700 dark:text-emerald-400">
                {passedCount} / {totalCriteria} Terpenuhi
              </span>
            </div>

            <div className="space-y-1.5">
              {evaluatedCriteria.map((c) => (
                <div
                  key={c.id}
                  className={`p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 transition ${
                    c.passed
                      ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                      : 'bg-slate-50 dark:bg-slate-850/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <span className="leading-snug">{c.label}</span>
                  {c.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Code Editor Box */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Editor Solusi ({challenge.language.toUpperCase()})</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowHint(!showHint)}
                  className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1 hover:underline"
                >
                  <Lightbulb className="w-3 h-3" />
                  <span>{showHint ? 'Tutup Hint' : 'Buka Hint'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1"
                  title="Reset kode awal"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {showHint && (
              <div className="p-3 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-900 dark:text-amber-200 space-y-1 animate-in fade-in">
                <span className="font-bold block">💡 Petunjuk Pengerjaan:</span>
                <ul className="list-disc pl-4 space-y-0.5">
                  {challenge.hints.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-700 bg-slate-950">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={7}
                disabled={isFinished || isTimeOut}
                placeholder="Tulis kode di sini..."
                className="w-full p-3 font-mono text-xs text-emerald-400 bg-transparent resize-y focus:outline-none focus:ring-0 leading-relaxed disabled:opacity-60"
                spellCheck={false}
              />
            </div>
          </div>

          {/* Solution Reveal Modal/Section if time out or requested */}
          {showSolution && (
            <div className="space-y-2 p-3.5 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 animate-in fade-in">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 dark:text-white">
                  Kunci Solusi Referensi:
                </span>
                <span className="text-[11px] text-slate-400 font-mono">Dosen UNUGHA</span>
              </div>
              <div className="rounded-xl overflow-hidden bg-slate-950 p-3">
                <pre className="text-xs font-mono text-emerald-400 overflow-x-auto">
                  <code>{challenge.solutionSnippet}</code>
                </pre>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {challenge.explanation}
              </p>
            </div>
          )}

          {/* Switch Challenge Selector */}
          <div className="pt-1 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-2">
            <span>Pilihan Tantangan Lainnya:</span>
            <div className="flex items-center gap-1">
              {DAILY_CHALLENGES_DATA.map((ch, idx) => (
                <button
                  key={ch.id}
                  onClick={() => setActiveChallengeIdx(idx)}
                  className={`px-2 py-1 rounded-md text-[11px] font-mono font-bold transition ${
                    activeChallengeIdx === idx
                      ? 'bg-emerald-700 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  #{idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            {allPassed ? (
              <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Siap Dikirim (+{totalPossibleScore} Poin)
              </span>
            ) : (
              <span>Lengkapi kriteria koding di atas</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Batal
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!allPassed || isFinished || isTimeOut}
              className={`min-h-[40px] px-5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                allPassed && !isFinished && !isTimeOut
                  ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-md active:scale-95'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Kirim Jawaban</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
