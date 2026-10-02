import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Filter,
  Bookmark,
  Sparkles,
  BookOpen,
  ChevronRight,
  CheckCircle2,
  GraduationCap,
  Brain,
  Sliders,
  FileCode,
  Zap,
  Flame,
  Timer,
  Trophy,
  ArrowRight
} from 'lucide-react';
import { Header } from './components/Header';
import { BottomNav, TabType } from './components/BottomNav';
import { ArticleCard } from './components/ArticleCard';
import { ArticleModal } from './components/ArticleModal';
import { CodePlayground } from './components/CodePlayground';
import { SyllabusView } from './components/SyllabusView';
import { AssignmentView } from './components/AssignmentView';
import { CloudflareGuideView } from './components/CloudflareGuideView';
import { QuizModal } from './components/QuizModal';
import { ProgressDashboard } from './components/ProgressDashboard';
import { Toast, ToastData } from './components/Toast';
import { VisualLayoutLab } from './components/VisualLayoutLab';
import { FlashcardsView } from './components/FlashcardsView';
import { CodeRecipesView } from './components/CodeRecipesView';
import { DailyChallengeModal } from './components/DailyChallengeModal';
import { ARTICLES_DATA, COURSE_INFO, ASSIGNMENTS_DATA } from './data/courseData';
import { DAILY_CHALLENGES_DATA } from './data/dailyChallengesData';
import { Article } from './types/course';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('materi');
  const [materiSubTab, setMateriSubTab] = useState<'modul' | 'kartu' | 'layout' | 'resep'>('modul');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isChallengeOpen, setIsChallengeOpen] = useState(false);
  const [isMobileFrame, setIsMobileFrame] = useState(false);
  const [toast, setToast] = useState<ToastData | null>(null);

  // Daily Challenge Gamification State
  const [challengeStreak, setChallengeStreak] = useState<number>(() => {
    try {
      const s = localStorage.getItem('unugha_challenge_streak');
      return s ? Number(s) : 1;
    } catch {
      return 1;
    }
  });

  const [challengePoints, setChallengePoints] = useState<number>(() => {
    try {
      const p = localStorage.getItem('unugha_challenge_points');
      return p ? Number(p) : 120;
    } catch {
      return 120;
    }
  });

  const handleChallengeSuccess = (score: number, challengeTitle: string) => {
    const newStreak = challengeStreak + 1;
    const newPoints = challengePoints + score;
    setChallengeStreak(newStreak);
    setChallengePoints(newPoints);
    try {
      localStorage.setItem('unugha_challenge_streak', String(newStreak));
      localStorage.setItem('unugha_challenge_points', String(newPoints));
    } catch {
      // ignore
    }
    showToast({
      type: 'complete',
      title: 'Tantangan Hari Ini Dituntaskan! ⚡',
      message: `+${score} XP berhasil diraih untuk "${challengeTitle}". Streak Anda: ${newStreak} Hari 🔥`
    });
  };

  const todayChallenge = DAILY_CHALLENGES_DATA[new Date().getDate() % DAILY_CHALLENGES_DATA.length];

  // Global Dark Mode state with localStorage persistence
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem('unugha_theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('unugha_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('unugha_theme', 'light');
      }
    } catch {
      // ignore
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Playground code transfer state
  const [playgroundInitialCode, setPlaygroundInitialCode] = useState<{
    html: string;
    css: string;
    js: string;
  } | null>(null);

  // Local Storage states for progress
  const [completedIds, setCompletedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('unugha_completed_articles');
      return saved ? JSON.parse(saved) : ['art-01'];
    } catch {
      return ['art-01'];
    }
  });

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('unugha_bookmarked_articles');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save to local storage
  useEffect(() => {
    try {
      localStorage.setItem('unugha_completed_articles', JSON.stringify(completedIds));
    } catch {
      // ignore
    }
  }, [completedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('unugha_bookmarked_articles', JSON.stringify(bookmarkedIds));
    } catch {
      // ignore
    }
  }, [bookmarkedIds]);

  const showToast = (toastData: Omit<ToastData, 'id'>) => {
    setToast({
      ...toastData,
      id: String(Date.now())
    });
  };

  const toggleComplete = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const article = ARTICLES_DATA.find((a) => a.id === id);
    const titleSnippet = article ? article.title : 'Modul materi';

    setCompletedIds((prev) => {
      const isAlreadyCompleted = prev.includes(id);
      if (isAlreadyCompleted) {
        showToast({
          type: 'uncomplete',
          title: 'Status Modul Diperbarui',
          message: `"${titleSnippet}" ditandai belum selesai.`
        });
        return prev.filter((item) => item !== id);
      } else {
        showToast({
          type: 'complete',
          title: 'Modul Berhasil Diselesaikan! 🎉',
          message: `"${titleSnippet}" telah dicatat pada rapor progres belajar.`
        });
        return [...prev, id];
      }
    });
  };

  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const article = ARTICLES_DATA.find((a) => a.id === id);
    const titleSnippet = article ? article.title : 'Materi';

    setBookmarkedIds((prev) => {
      const isAlreadyBookmarked = prev.includes(id);
      if (isAlreadyBookmarked) {
        showToast({
          type: 'unbookmark',
          title: 'Dihapus dari Bookmark',
          message: `"${titleSnippet}" dihapus dari daftar bacaan.`
        });
        return prev.filter((item) => item !== id);
      } else {
        showToast({
          type: 'bookmark',
          title: 'Materi Tersimpan ke Bookmark 📌',
          message: `"${titleSnippet}" dapat diakses cepat pada filter tersimpan.`
        });
        return [...prev, id];
      }
    });
  };

  const handleOpenPlaygroundFromArticle = (code: { html: string; css: string; js: string }) => {
    setPlaygroundInitialCode(code);
    setActiveTab('lab');
  };

  // Filtered articles
  const categories = ['Semua', 'Dasar Web', 'CSS & UI', 'JavaScript', 'Deploy & Git'];

  const filteredArticles = useMemo(() => {
    return ARTICLES_DATA.filter((art) => {
      const matchSearch =
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory =
        selectedCategory === 'Semua' || art.category === selectedCategory;

      const matchBookmark = !showOnlyBookmarked || bookmarkedIds.includes(art.id);

      return matchSearch && matchCategory && matchBookmark;
    });
  }, [searchQuery, selectedCategory, showOnlyBookmarked, bookmarkedIds]);

  // Featured article (first in progress or latest)
  const featuredArticle = ARTICLES_DATA[3] || ARTICLES_DATA[0];

  return (
    <div
      className={`min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col items-center justify-start transition-colors duration-200 ${
        isMobileFrame ? 'p-0 sm:py-8' : ''
      }`}
    >
      {/* Toast Notification Container */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Outer Shell: Mobile Frame Mode or Fluid Mode */}
      <div
        className={`w-full bg-slate-50 dark:bg-slate-900 min-h-screen flex flex-col transition-all duration-200 ${
          isMobileFrame
            ? 'max-w-[430px] sm:h-[900px] sm:min-h-0 sm:rounded-[40px] sm:shadow-2xl sm:border-[8px] sm:border-slate-800 dark:sm:border-slate-700 overflow-hidden relative'
            : 'max-w-2xl mx-auto shadow-sm border-x border-slate-200/80 dark:border-slate-800'
        }`}
      >
        {/* Top App Bar with Dark Mode Toggle & Tantangan Button */}
        <Header
          completedArticlesCount={completedIds.length}
          totalArticlesCount={ARTICLES_DATA.length}
          isMobileFrame={isMobileFrame}
          setIsMobileFrame={setIsMobileFrame}
          onOpenQuiz={() => setIsQuizOpen(true)}
          onOpenChallenge={() => setIsChallengeOpen(true)}
          streakCount={challengeStreak}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />

        {/* Main Content Area */}
        <main className="flex-1 px-4 py-4 pb-24 overflow-y-auto">
          {/* TAB 1: MATERI & STUDI EKSPLORATIF PERKULIAHAN */}
          {activeTab === 'materi' && (
            <div className="space-y-4">
              {/* Campus Greeting Kicker */}
              <div className="bg-gradient-to-r from-emerald-800 to-slate-900 text-white rounded-3xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="p-1 rounded-lg bg-emerald-500/20 text-emerald-300">
                    <GraduationCap className="w-4 h-4" />
                  </span>
                  <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
                    {COURSE_INFO.prodi} · UNUGHA Cilacap
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-bold leading-snug">
                  Mata Kuliah Pemrograman Web
                </h2>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Modul belajar mandiri, tantangan koding harian, laboratorium layout interaktif, kartu kilat konsep, dan resep kode siap pakai.
                </p>

                {/* Quick stats unboxed */}
                <div className="mt-4 pt-3 border-t border-emerald-700/50 flex items-center justify-between text-xs text-emerald-100">
                  <span>{ARTICLES_DATA.length} Modul Materi</span>
                  <span aria-hidden="true">·</span>
                  <span>16 Pertemuan RPS</span>
                  <span aria-hidden="true">·</span>
                  <button
                    onClick={() => setActiveTab('panduan')}
                    className="font-bold underline hover:text-white"
                  >
                    Deploy Pages →
                  </button>
                </div>
              </div>

              {/* Daily Challenge Interactive Banner */}
              <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/5 dark:from-amber-950/40 dark:via-orange-950/30 dark:to-slate-900 border border-amber-300/80 dark:border-amber-800/80 rounded-3xl p-4 sm:p-5 relative overflow-hidden transition-all shadow-xs">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-amber-900 dark:text-amber-400 bg-amber-200/80 dark:bg-amber-900/60 px-2 py-0.5 rounded-lg">
                        <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        Tantangan Hari Ini
                      </span>
                      <span className="text-[11px] font-mono text-orange-800 dark:text-orange-300 font-bold flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                        Streak: {challengeStreak} Hari
                      </span>
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                        · ⏱️ {Math.round(todayChallenge.timeLimitSeconds / 60)} Menit
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug pt-1">
                      {todayChallenge.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {todayChallenge.description}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-xl border border-amber-200 dark:border-amber-800/80 block shadow-2xs">
                      +{todayChallenge.basePoints} XP
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-1">+Bonus Waktu</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-amber-200/60 dark:border-amber-800/60 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <Trophy className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>Total XP Koding Anda: <strong className="font-mono text-slate-900 dark:text-white">{challengePoints} XP</strong></span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsChallengeOpen(true)}
                    className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-xs active:scale-95 shrink-0"
                  >
                    <span>Mulai Koding</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Sub-mode Segmented Tabs for Learning Studio */}
              <div className="grid grid-cols-4 gap-1 p-1 bg-slate-200/70 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/80 text-xs">
                <button
                  type="button"
                  onClick={() => setMateriSubTab('modul')}
                  className={`py-2 px-1 rounded-xl font-bold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition ${
                    materiSubTab === 'modul'
                      ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span className="text-[11px] sm:text-xs">Modul RPS</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMateriSubTab('kartu')}
                  className={`py-2 px-1 rounded-xl font-bold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition ${
                    materiSubTab === 'kartu'
                      ? 'bg-white dark:bg-slate-700 text-amber-700 dark:text-amber-300 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Brain className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-[11px] sm:text-xs">Kartu Kilat</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMateriSubTab('layout')}
                  className={`py-2 px-1 rounded-xl font-bold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition ${
                    materiSubTab === 'layout'
                      ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-[11px] sm:text-xs">Visual Lab</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMateriSubTab('resep')}
                  className={`py-2 px-1 rounded-xl font-bold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition ${
                    materiSubTab === 'resep'
                      ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-300 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                  <span className="text-[11px] sm:text-xs">Resep Kode</span>
                </button>
              </div>

              {/* VIEW 1: MODUL & ARTIKEL */}
              {materiSubTab === 'modul' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  {/* Semester Progress Visualization Dashboard (Radial Progress, Badges & PDF) */}
                  <ProgressDashboard
                    articles={ARTICLES_DATA}
                    completedIds={completedIds}
                    onOpenArticle={(art) => setSelectedArticle(art)}
                  />

                  {/* Search Bar & Bookmark Filter */}
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                      <input
                        type="search"
                        placeholder="Cari materi (HTML, Flexbox, DOM, Git)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 bg-white dark:bg-slate-850/90 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/80 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500 shadow-2xs transition-colors"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowOnlyBookmarked(!showOnlyBookmarked)}
                      className={`min-h-[42px] px-3 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition ${
                        showOnlyBookmarked
                          ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700/80 text-amber-800 dark:text-amber-300'
                          : 'bg-white dark:bg-slate-850/90 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/60'
                      }`}
                      title="Tampilkan hanya materi yang disimpan"
                    >
                      <Bookmark
                        className={`w-3.5 h-3.5 ${showOnlyBookmarked ? 'fill-amber-500 text-amber-500' : ''}`}
                      />
                      <span className="hidden xs:inline">Tersimpan</span>
                    </button>
                  </div>

                  {/* Category Filter Buttons */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`min-h-[36px] px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                          selectedCategory === cat
                            ? 'bg-emerald-800 dark:bg-emerald-700 text-white shadow-xs'
                            : 'bg-white dark:bg-slate-850/90 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-700/60'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Featured Card if no filter applied */}
                  {selectedCategory === 'Semua' && !searchQuery && !showOnlyBookmarked && (
                    <div
                      onClick={() => setSelectedArticle(featuredArticle)}
                      className="bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/90 dark:border-emerald-800/80 rounded-2xl p-4 cursor-pointer hover:border-emerald-400 dark:hover:border-emerald-600 transition group active:scale-[0.99]"
                    >
                      <div className="flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-400 mb-1">
                        <span className="font-bold flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                          Fokus Praktikum Pekan Ini
                        </span>
                        <span className="font-mono text-[11px] text-emerald-700 dark:text-emerald-400">
                          Prt. {featuredArticle.meetingNumber}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition">
                        {featuredArticle.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-1">
                        {featuredArticle.excerpt}
                      </p>
                      <div className="mt-3 flex items-center justify-between text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                        <span>Baca Modul Lengkap</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  )}

                  {/* Articles Grid / List */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
                      <span>Daftar Artikel Pembelajaran ({filteredArticles.length})</span>
                      {showOnlyBookmarked && (
                        <span className="text-amber-700 dark:text-amber-400 font-medium">Filter: Disimpan</span>
                      )}
                    </div>

                    {filteredArticles.length > 0 ? (
                      filteredArticles.map((article) => (
                        <ArticleCard
                          key={article.id}
                          article={article}
                          isCompleted={completedIds.includes(article.id)}
                          isBookmarked={bookmarkedIds.includes(article.id)}
                          onToggleComplete={toggleComplete}
                          onToggleBookmark={toggleBookmark}
                          onOpenArticle={(art) => setSelectedArticle(art)}
                        />
                      ))
                    ) : (
                      <div className="text-center py-12 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-6 space-y-2">
                        <BookOpen className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                          Materi tidak ditemukan
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Coba ganti kata kunci pencarian atau reset filter kategori.
                        </p>
                        <button
                          onClick={() => {
                            setSearchQuery('');
                            setSelectedCategory('Semua');
                            setShowOnlyBookmarked(false);
                          }}
                          className="mt-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 underline"
                        >
                          Reset Filter
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* VIEW 2: KARTU KILAT (FLASHCARDS ACTIVE RECALL) */}
              {materiSubTab === 'kartu' && (
                <div className="animate-in fade-in duration-200">
                  <FlashcardsView />
                </div>
              )}

              {/* VIEW 3: VISUAL LAYOUT STUDIO (FLEXBOX & GRID) */}
              {materiSubTab === 'layout' && (
                <div className="animate-in fade-in duration-200">
                  <VisualLayoutLab onSendToLab={handleOpenPlaygroundFromArticle} />
                </div>
              )}

              {/* VIEW 4: RESEP KODE POPULER (COOKBOOK) */}
              {materiSubTab === 'resep' && (
                <div className="animate-in fade-in duration-200">
                  <CodeRecipesView onSendToLab={handleOpenPlaygroundFromArticle} />
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SILABUS 16 PERTEMUAN */}
          {activeTab === 'silabus' && <SyllabusView />}

          {/* TAB 3: LIVE CODE PLAYGROUND */}
          {activeTab === 'lab' && (
            <CodePlayground initialCode={playgroundInitialCode} />
          )}

          {/* TAB 4: TUGAS & PENGUMPULAN */}
          {activeTab === 'tugas' && <AssignmentView />}

          {/* TAB 5: PANDUAN DEPLOY CLOUDFLARE & INFO KAMPUS */}
          {activeTab === 'panduan' && <CloudflareGuideView />}
        </main>

        {/* Bottom Navigation Anchor */}
        <BottomNav
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          unsubmittedAssignmentsCount={ASSIGNMENTS_DATA.length}
        />

        {/* Article Reader Modal */}
        <ArticleModal
          article={selectedArticle}
          isOpen={!!selectedArticle}
          onClose={() => setSelectedArticle(null)}
          isCompleted={selectedArticle ? completedIds.includes(selectedArticle.id) : false}
          isBookmarked={selectedArticle ? bookmarkedIds.includes(selectedArticle.id) : false}
          onToggleComplete={(id) => toggleComplete(id)}
          onToggleBookmark={(id) => toggleBookmark(id)}
          onOpenInPlayground={handleOpenPlaygroundFromArticle}
        />

        {/* Quick Quiz Modal */}
        <QuizModal
          isOpen={isQuizOpen}
          onClose={() => setIsQuizOpen(false)}
        />

        {/* Daily Coding Challenge Modal */}
        <DailyChallengeModal
          isOpen={isChallengeOpen}
          onClose={() => setIsChallengeOpen(false)}
          onSuccess={handleChallengeSuccess}
          streakCount={challengeStreak}
        />
      </div>
    </div>
  );
}
