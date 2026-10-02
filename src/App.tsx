import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Bookmark, Sparkles, BookOpen, ChevronRight, CheckCircle2, GraduationCap } from 'lucide-react';
import { Header } from './components/Header';
import { BottomNav, TabType } from './components/BottomNav';
import { ArticleCard } from './components/ArticleCard';
import { ArticleModal } from './components/ArticleModal';
import { CodePlayground } from './components/CodePlayground';
import { SyllabusView } from './components/SyllabusView';
import { AssignmentView } from './components/AssignmentView';
import { CloudflareGuideView } from './components/CloudflareGuideView';
import { QuizModal } from './components/QuizModal';
import { ARTICLES_DATA, COURSE_INFO, ASSIGNMENTS_DATA } from './data/courseData';
import { Article } from './types/course';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('materi');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isMobileFrame, setIsMobileFrame] = useState(false);

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

  const toggleComplete = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
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
      className={`min-h-screen bg-slate-100 flex flex-col items-center justify-start ${
        isMobileFrame ? 'p-0 sm:py-8' : ''
      }`}
    >
      {/* Outer Shell: Mobile Frame Mode or Fluid Mode */}
      <div
        className={`w-full bg-slate-50 min-h-screen flex flex-col transition-all duration-200 ${
          isMobileFrame
            ? 'max-w-[430px] sm:h-[900px] sm:min-h-0 sm:rounded-[40px] sm:shadow-2xl sm:border-[8px] sm:border-slate-800 overflow-hidden relative'
            : 'max-w-2xl mx-auto shadow-sm border-x border-slate-200/80'
        }`}
      >
        {/* Top App Bar */}
        <Header
          completedArticlesCount={completedIds.length}
          totalArticlesCount={ARTICLES_DATA.length}
          isMobileFrame={isMobileFrame}
          setIsMobileFrame={setIsMobileFrame}
          onOpenQuiz={() => setIsQuizOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 px-4 py-4 pb-24 overflow-y-auto">
          {/* TAB 1: MATERI & BLOG PERKULIAHAN */}
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
                  Modul belajar mandiri, panduan praktikum lab komputer, dan materi terstruktur untuk mahasiswa semester berjalan.
                </p>

                {/* Quick stats unboxed */}
                <div className="mt-4 pt-3 border-t border-emerald-700/50 flex items-center justify-between text-xs text-emerald-100">
                  <span>{ARTICLES_DATA.length} Modul Materi</span>
                  <span aria-hidden="true">·</span>
                  <span>16 Pertemuan</span>
                  <span aria-hidden="true">·</span>
                  <button
                    onClick={() => setActiveTab('panduan')}
                    className="font-bold underline hover:text-white"
                  >
                    Deploy Pages →
                  </button>
                </div>
              </div>

              {/* Search Bar & Bookmark Filter */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="search"
                    placeholder="Cari materi (HTML, Flexbox, DOM, Git)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 shadow-2xs"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setShowOnlyBookmarked(!showOnlyBookmarked)}
                  className={`min-h-[42px] px-3 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition ${
                    showOnlyBookmarked
                      ? 'bg-amber-50 border-amber-300 text-amber-800'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                  title="Tampilkan hanya materi yang disimpan"
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 ${showOnlyBookmarked ? 'fill-amber-500' : ''}`}
                  />
                  <span className="hidden xs:inline">Tersimpan</span>
                </button>
              </div>

              {/* Category Filter Buttons (Functional segmented buttons) */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`min-h-[36px] px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                      selectedCategory === cat
                        ? 'bg-emerald-800 text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
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
                  className="bg-emerald-50/70 border border-emerald-200/90 rounded-2xl p-4 cursor-pointer hover:border-emerald-400 transition group active:scale-[0.99]"
                >
                  <div className="flex items-center justify-between text-xs text-emerald-800 mb-1">
                    <span className="font-bold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                      Fokus Praktikum Pekan Ini
                    </span>
                    <span className="font-mono text-[11px] text-emerald-700">
                      Prt. {featuredArticle.meetingNumber}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-xs font-semibold text-emerald-700">
                    <span>Baca Modul Lengkap</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              )}

              {/* Articles Grid / List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                  <span>Daftar Artikel Pembelajaran ({filteredArticles.length})</span>
                  {showOnlyBookmarked && (
                    <span className="text-amber-700 font-medium">Filter: Disimpan</span>
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
                  <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6 space-y-2">
                    <BookOpen className="w-8 h-8 text-slate-300 mx-auto" />
                    <p className="text-sm font-semibold text-slate-700">
                      Materi tidak ditemukan
                    </p>
                    <p className="text-xs text-slate-500">
                      Coba ganti kata kunci pencarian atau reset filter kategori.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('Semua');
                        setShowOnlyBookmarked(false);
                      }}
                      className="mt-2 text-xs font-bold text-emerald-700 underline"
                    >
                      Reset Filter
                    </button>
                  </div>
                )}
              </div>
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
      </div>
    </div>
  );
}
