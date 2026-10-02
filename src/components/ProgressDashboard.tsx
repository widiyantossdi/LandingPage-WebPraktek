import React, { useState } from 'react';
import {
  TrendingUp,
  Award,
  Flame,
  ChevronRight,
  Code2,
  Palette,
  Zap,
  CloudLightning,
  Trophy,
  Sparkles,
  Lock,
  CheckCircle2,
  X,
  FileDown,
  Printer
} from 'lucide-react';
import { Article } from '../types/course';
import { generateProgressPdf } from '../utils/generateProgressPdf';

interface ProgressDashboardProps {
  articles: Article[];
  completedIds: string[];
  onOpenArticle: (article: Article) => void;
}

export interface BadgeItem {
  id: string;
  title: string;
  subtitle: string;
  categoryTag: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  requirement: string;
  color: string;
  isUnlocked: boolean;
  progressText: string;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  articles,
  completedIds,
  onOpenArticle
}) => {
  const [selectedBadge, setSelectedBadge] = useState<BadgeItem | null>(null);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [studentName, setStudentName] = useState(() => {
    return localStorage.getItem('unugha_student_name') || '';
  });
  const [studentNim, setStudentNim] = useState(() => {
    return localStorage.getItem('unugha_student_nim') || '';
  });
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const totalCount = articles.length;
  const completedCount = completedIds.length;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Find next uncompleted article
  const nextArticle = articles.find((art) => !completedIds.includes(art.id));

  // Category breakdown
  const categories = ['Dasar Web', 'CSS & UI', 'JavaScript', 'Deploy & Git'] as const;
  const categoryStats = categories.map((cat) => {
    const inCat = articles.filter((a) => a.category === cat);
    const completedInCat = inCat.filter((a) => completedIds.includes(a.id)).length;
    return {
      name: cat,
      total: inCat.length,
      completed: completedInCat,
      percent: inCat.length > 0 ? Math.round((completedInCat / inCat.length) * 100) : 0
    };
  });

  // Calculate Badges
  const dasarWebCompleted = articles.filter((a) => a.category === 'Dasar Web' && completedIds.includes(a.id)).length;
  const cssCompleted = articles.filter((a) => a.category === 'CSS & UI' && completedIds.includes(a.id)).length;
  const jsCompleted = articles.filter((a) => a.category === 'JavaScript' && completedIds.includes(a.id)).length;
  const deployCompleted = articles.filter((a) => a.category === 'Deploy & Git' && completedIds.includes(a.id)).length;

  const BADGES: BadgeItem[] = [
    {
      id: 'first-step',
      title: 'Langkah Perdana',
      subtitle: 'First Commit',
      categoryTag: 'Orientasi',
      icon: Sparkles,
      description: 'Menyelesaikan modul pertama perkuliahan Pemrograman Web.',
      requirement: 'Selesaikan minimal 1 modul pembelajaran.',
      color: 'from-amber-500 to-orange-500',
      isUnlocked: completedCount >= 1,
      progressText: completedCount >= 1 ? 'Tercapai' : `${completedCount}/1 Modul`
    },
    {
      id: 'html-master',
      title: 'HTML Master',
      subtitle: 'Semantic Architect',
      categoryTag: 'Dasar Web',
      icon: Code2,
      description: 'Menguasai arsitektur client-server dan tag HTML5 semantik serta aksesibilitas.',
      requirement: 'Tuntaskan seluruh modul klaster Dasar Web (2 modul).',
      color: 'from-blue-600 to-indigo-600',
      isUnlocked: dasarWebCompleted >= 2,
      progressText: dasarWebCompleted >= 2 ? 'Tercapai' : `${dasarWebCompleted}/2 Modul`
    },
    {
      id: 'css-wizard',
      title: 'CSS Styling Wizard',
      subtitle: 'Flexbox & Tailwind Pro',
      categoryTag: 'CSS & UI',
      icon: Palette,
      description: 'Mampu menyusun tata letak modern responsif menggunakan Flexbox, Grid, dan Tailwind CSS.',
      requirement: 'Tuntaskan seluruh modul klaster CSS & UI (2 modul).',
      color: 'from-cyan-500 to-teal-600',
      isUnlocked: cssCompleted >= 2,
      progressText: cssCompleted >= 2 ? 'Tercapai' : `${cssCompleted}/2 Modul`
    },
    {
      id: 'js-ninja',
      title: 'JavaScript Ninja',
      subtitle: 'DOM & Async Expert',
      categoryTag: 'JavaScript',
      icon: Zap,
      description: 'Mahir manipulasi DOM browser, penanganan event dinamis, dan asynchronous Fetch API.',
      requirement: 'Tuntaskan seluruh modul klaster JavaScript (2 modul).',
      color: 'from-yellow-500 to-amber-600',
      isUnlocked: jsCompleted >= 2,
      progressText: jsCompleted >= 2 ? 'Tercapai' : `${jsCompleted}/2 Modul`
    },
    {
      id: 'deployment-ninja',
      title: 'Deployment Ninja',
      subtitle: 'Cloudflare Edge Hero',
      categoryTag: 'Deploy & Git',
      icon: CloudLightning,
      description: 'Berhasil menguasai kolaborasi Git/GitHub dan mempublikasikan web ke Cloudflare Pages.',
      requirement: 'Tuntaskan seluruh modul klaster Deploy & Git (2 modul).',
      color: 'from-orange-500 to-emerald-600',
      isUnlocked: deployCompleted >= 2,
      progressText: deployCompleted >= 2 ? 'Tercapai' : `${deployCompleted}/2 Modul`
    },
    {
      id: 'unugha-master',
      title: 'Web Master UNUGHA',
      subtitle: 'Semester Finisher',
      categoryTag: 'Lengkap',
      icon: Trophy,
      description: 'Pencapaian tertinggi: menuntaskan seluruh 8 modul materi praktikum semester ini.',
      requirement: 'Selesaikan seluruh 8 modul perkuliahan.',
      color: 'from-emerald-600 to-teal-700',
      isUnlocked: completedCount >= totalCount && totalCount > 0,
      progressText: completedCount >= totalCount ? 'Tercapai' : `${completedCount}/${totalCount} Modul`
    }
  ];

  const unlockedCount = BADGES.filter((b) => b.isUnlocked).length;

  // Semester level title based on growth
  let studentLevel = 'Pemula (Fondasi Web)';
  let levelDesc = 'Mulai kuasai arsitektur client-server dan tag HTML5 semantik.';
  if (percentage >= 100) {
    studentLevel = 'Web Master SI (Siap UAS)';
    levelDesc = 'Luar biasa! Seluruh materi semester telah tuntas dikuasai.';
  } else if (percentage >= 75) {
    studentLevel = 'Advanced (Cloudflare Edge & Git)';
    levelDesc = 'Siap mempublikasikan aplikasi produksi ke internet.';
  } else if (percentage >= 50) {
    studentLevel = 'Intermediate (JavaScript & DOM)';
    levelDesc = 'Mampu membangun interaktivitas dan manipulasi data dinamis.';
  } else if (percentage >= 25) {
    studentLevel = 'Junior Dev (CSS3 & Tailwind)';
    levelDesc = 'Fondasi tata letak responsif dan desain mobile-first mulai terbentuk.';
  }

  // SVG Radial Progress Ring math
  const size = 88;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Handle PDF Download
  const handleDownloadPdf = () => {
    setIsDownloading(true);
    setDownloadSuccess(false);

    try {
      const finalName = studentName.trim() || 'Mahasiswa SI UNUGHA';
      const finalNim = studentNim.trim() || 'SI-2024-XXXX';

      // Save to localStorage for convenience
      localStorage.setItem('unugha_student_name', finalName);
      localStorage.setItem('unugha_student_nim', finalNim);

      generateProgressPdf(articles, completedIds, BADGES, {
        name: finalName,
        nim: finalNim
      });

      setDownloadSuccess(true);
      setTimeout(() => {
        setIsDownloading(false);
        setIsPdfModalOpen(false);
        setDownloadSuccess(false);
      }, 1200);
    } catch (err) {
      console.error('Error generating progress PDF:', err);
      setIsDownloading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-850/90 dark:bg-slate-800/80 rounded-3xl border border-slate-200/90 dark:border-slate-700/80 p-4 sm:p-5 shadow-xs space-y-4 transition-colors">
      {/* Header: Zero-Pill Typography & PDF Action */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700/60 gap-2">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300">
            <TrendingUp className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-tight">
              Progres Belajar Semester
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Evaluasi Capaian Mandiri Mahasiswa SI UNUGHA
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsPdfModalOpen(true)}
            className="min-h-[32px] px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/80 text-xs font-semibold flex items-center gap-1.5 transition active:scale-95 shadow-2xs"
            title="Unduh Laporan Capaian Belajar dalam format PDF resmi"
          >
            <FileDown className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
            <span className="hidden sm:inline">Unduh PDF</span>
            <span className="sm:hidden">PDF</span>
          </button>

          <div className="hidden sm:flex items-center gap-1 text-xs text-emerald-700 dark:text-emerald-400 font-semibold bg-slate-50 dark:bg-slate-900/60 px-2.5 py-1 rounded-xl border border-slate-200/70 dark:border-slate-700/60">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="font-mono tabular-nums">{completedCount}/{totalCount}</span>
            <span className="text-slate-400 dark:text-slate-500 font-normal">Modul</span>
          </div>
        </div>
      </div>

      {/* Main Stats Row: Radial Progress Ring + Student Level */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
        {/* Radial Progress Ring */}
        <div className="sm:col-span-5 flex items-center gap-3.5 bg-slate-50/80 dark:bg-slate-900/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-700/60">
          <div className="relative shrink-0 flex items-center justify-center">
            <svg
              width={size}
              height={size}
              className="transform -rotate-90"
              aria-label={`Progres modul ${percentage}%`}
            >
              {/* Background Track Circle */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                className="stroke-slate-200 dark:stroke-slate-700"
                strokeWidth={strokeWidth}
                fill="none"
              />
              {/* Progress Radial Arc */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                className="stroke-emerald-600 dark:stroke-emerald-500 transition-all duration-700 ease-out"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            {/* Inner Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-lg font-extrabold font-mono text-slate-900 dark:text-white tracking-tight tabular-nums">
                {percentage}%
              </span>
              <span className="text-[9px] uppercase tracking-wider font-semibold text-emerald-700 dark:text-emerald-400">
                Tuntas
              </span>
            </div>
          </div>

          <div className="space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
              Tingkat Kompetensi
            </span>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
              {studentLevel}
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
              {levelDesc}
            </p>
          </div>
        </div>

        {/* Category Breakdown Progress Bars */}
        <div className="sm:col-span-7 space-y-2">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Penguasaan per Klaster Materi:
          </span>
          <div className="space-y-1.5">
            {categoryStats.map((stat) => (
              <div key={stat.name} className="space-y-0.5">
                <div className="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400">
                  <span className="font-medium text-slate-700 dark:text-slate-300">{stat.name}</span>
                  <span className="font-mono tabular-nums text-slate-500 dark:text-slate-400">
                    <strong className="text-slate-900 dark:text-white font-semibold">{stat.completed}</strong>/{stat.total}
                    <span className="text-slate-400 dark:text-slate-500 ml-1">({stat.percent}%)</span>
                  </span>
                </div>
                {/* Horizontal Micro Bar */}
                <div className="w-full bg-slate-100 dark:bg-slate-700/60 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      stat.percent === 100
                        ? 'bg-emerald-600 dark:bg-emerald-500'
                        : stat.percent > 0
                        ? 'bg-emerald-500 dark:bg-emerald-400'
                        : 'bg-transparent'
                    }`}
                    style={{ width: `${stat.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-500" />
            <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Lencana Prestasi Mahasiswa
            </span>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            <strong className="text-emerald-700 dark:text-emerald-400 font-bold font-mono">{unlockedCount}</strong>/{BADGES.length} Terbuka
          </span>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {BADGES.map((badge) => {
            const IconComponent = badge.icon;
            const isUnlocked = badge.isUnlocked;

            return (
              <button
                key={badge.id}
                type="button"
                onClick={() => setSelectedBadge(badge)}
                className={`p-2 rounded-2xl border text-center transition-all flex flex-col items-center justify-between min-h-[96px] relative group active:scale-95 ${
                  isUnlocked
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-200/80 dark:border-emerald-800/60 hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200/70 dark:border-slate-700/60 opacity-60 hover:opacity-80'
                }`}
                title={`${badge.title} - ${isUnlocked ? 'Telah Diraih' : 'Belum Terbuka'}`}
              >
                {/* Badge Icon Wrapper */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 shadow-2xs ${
                    isUnlocked
                      ? `bg-gradient-to-br ${badge.color} text-white`
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                </div>

                {/* Badge Title & Status */}
                <div className="w-full mt-1.5">
                  <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200 line-clamp-1 block leading-tight">
                    {badge.title}
                  </span>
                  <span
                    className={`text-[9px] block font-mono leading-tight mt-0.5 ${
                      isUnlocked ? 'text-emerald-700 dark:text-emerald-400 font-semibold' : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    {isUnlocked ? '✓ Diraih' : badge.progressText}
                  </span>
                </div>

                {/* Lock icon overlay if locked */}
                {!isUnlocked && (
                  <div className="absolute top-1 right-1 p-0.5 rounded-full bg-slate-200/90 dark:bg-slate-700/90 text-slate-500 dark:text-slate-400">
                    <Lock className="w-2.5 h-2.5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Actionable Next Step Footer */}
      {nextArticle ? (
        <div
          onClick={() => onOpenArticle(nextArticle)}
          className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-3 text-xs cursor-pointer group hover:bg-slate-50/70 dark:hover:bg-slate-700/40 p-2 rounded-xl transition"
        >
          <div className="flex items-center gap-2 truncate">
            <div className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-mono font-bold text-[10px] flex items-center justify-center shrink-0">
              P{nextArticle.meetingNumber}
            </div>
            <div className="truncate">
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium block">
                Lanjutkan Belajar:
              </span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition truncate block">
                {nextArticle.title}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="min-h-[36px] px-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs flex items-center gap-1 transition shrink-0 active:scale-95 shadow-2xs"
          >
            <span>Buka Modul</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      ) : (
        <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-300 bg-emerald-50/70 dark:bg-emerald-950/40 p-2.5 rounded-xl">
          <Award className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
          <span>
            <strong>Selamat!</strong> Anda telah menyelesaikan seluruh modul materi Pemrograman Web semester ini.
          </span>
        </div>
      )}

      {/* Badge Detail Modal Dialog */}
      {selectedBadge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <span>Lencana</span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-emerald-800 dark:text-emerald-400">{selectedBadge.categoryTag}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBadge(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                aria-label="Tutup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center space-y-2">
              <div
                className={`w-14 h-14 rounded-2xl mx-auto flex items-center justify-center shadow-md ${
                  selectedBadge.isUnlocked
                    ? `bg-gradient-to-br ${selectedBadge.color} text-white`
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                }`}
              >
                {React.createElement(selectedBadge.icon, { className: 'w-7 h-7' })}
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {selectedBadge.title}
                </h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                  {selectedBadge.subtitle}
                </p>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                {selectedBadge.description}
              </p>
            </div>

            {/* Requirement Box */}
            <div
              className={`p-3 rounded-2xl border text-xs space-y-1 ${
                selectedBadge.isUnlocked
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60 text-emerald-950 dark:text-emerald-200'
                  : 'bg-slate-50 dark:bg-slate-850 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between font-semibold">
                <span className="flex items-center gap-1">
                  {selectedBadge.isUnlocked ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Status: Telah Diraih!</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5 text-slate-500" />
                      <span>Status: Terkunci</span>
                    </>
                  )}
                </span>
                <span className="font-mono">{selectedBadge.progressText}</span>
              </div>
              <p className="text-[11px] opacity-80">
                <strong>Ketentuan:</strong> {selectedBadge.requirement}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSelectedBadge(null)}
              className="w-full min-h-[42px] py-2 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white font-semibold text-xs transition"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* PDF Download Modal Dialog */}
      {isPdfModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300">
                  <Printer className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Cetak Rapor Progres Belajar (PDF)
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Dokumen resmi evaluasi belajar mahasiswa UNUGHA Cilacap
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsPdfModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                aria-label="Tutup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Info Summary Preview */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Mata Kuliah:</span>
                <span className="font-bold text-slate-800 dark:text-white">Pemrograman Web (3 SKS)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Capaian Kurikulum:</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-400 font-mono">
                  {completedCount}/{totalCount} Modul ({percentage}%)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Lencana Diraih:</span>
                <span className="font-bold text-slate-800 dark:text-white font-mono">
                  {unlockedCount} dari {BADGES.length} Lencana
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Dosen Pengampu:</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">Widiyanto, M.Kom.</span>
              </div>
            </div>

            {/* Student Identity Form */}
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Nama Lengkap Mahasiswa:
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Ahmad Fauzi"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  NIM (Nomor Induk Mahasiswa):
                </label>
                <input
                  type="text"
                  placeholder="Contoh: 2024010045"
                  value={studentNim}
                  onChange={(e) => setStudentNim(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>
            </div>

            {/* Format info */}
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              PDF mencakup kop surat prodi Sistem Informasi UNUGHA, tabel rincian modul pertemuan 1-16, daftar lencana prestasi, serta lembar tanda tangan mahasiswa dan dosen.
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsPdfModalOpen(false)}
                className="flex-1 min-h-[42px] py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={isDownloading}
                onClick={handleDownloadPdf}
                className={`flex-1 min-h-[42px] py-2 px-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition text-white shadow-2xs ${
                  downloadSuccess
                    ? 'bg-emerald-600'
                    : 'bg-emerald-700 hover:bg-emerald-800 active:scale-95'
                }`}
              >
                {isDownloading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Menyiapkan PDF...</span>
                  </>
                ) : downloadSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Berhasil Diunduh!</span>
                  </>
                ) : (
                  <>
                    <FileDown className="w-4 h-4" />
                    <span>Unduh PDF Sekarang</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
