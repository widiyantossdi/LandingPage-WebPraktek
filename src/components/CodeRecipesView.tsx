import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Copy,
  Check,
  Code2,
  Tag,
  ArrowUpRight,
  Sparkles,
  Terminal,
  FileCode
} from 'lucide-react';
import { CODE_RECIPES_DATA, CodeRecipe } from '../data/codeRecipesData';

interface CodeRecipesViewProps {
  onSendToLab?: (code: { html: string; css: string; js: string }) => void;
}

export const CodeRecipesView: React.FC<CodeRecipesViewProps> = ({ onSendToLab }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['Semua', 'JavaScript', 'CSS Layout', 'DOM & Events', 'Deploy & Git'];

  const filteredRecipes = CODE_RECIPES_DATA.filter((r) => {
    const matchCat = selectedCategory === 'Semua' || r.category === selectedCategory;
    const matchSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase()) ||
      r.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleOpenInPlayground = (recipe: CodeRecipe) => {
    if (!onSendToLab) return;

    if (recipe.category === 'CSS Layout') {
      onSendToLab({
        html: `<div class="card-grid">
  <div class="card-item">
    <h3>Modul 01</h3>
    <p>Dasar Arsitektur Web Client Server</p>
  </div>
  <div class="card-item">
    <h3>Modul 02</h3>
    <p>HTML5 Semantik & Aksesibilitas</p>
  </div>
  <div class="card-item">
    <h3>Modul 03</h3>
    <p>CSS Modern Flexbox & Grid</p>
  </div>
</div>`,
        css: recipe.code,
        js: `console.log('CSS Grid Recipe Loaded');`
      });
    } else {
      onSendToLab({
        html: `<div class="p-4 space-y-4">
  <h2 class="text-xl font-bold">Uji Resep Kode: ${recipe.title}</h2>
  <div id="status" class="text-sm text-gray-600"></div>
  <ul id="daftar-mhs" class="space-y-2"></ul>
</div>`,
        css: `/* Resep Praktikum */\nbody { font-family: sans-serif; }`,
        js: recipe.code
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-850/90 dark:bg-slate-800/80 rounded-2xl border border-slate-200/90 dark:border-slate-700/80 p-4 transition-colors">
        <div className="flex items-center gap-2.5 mb-2">
          <span className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400">
            <FileCode className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-tight">
              Kamus & Resep Kode Populer (Cookbook)
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Kumpulan pola kode siap pakai dan teruji untuk tugas praktikum pemrograman web
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mt-3">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          <input
            type="search"
            placeholder="Cari resep kode (fetch, grid, dark mode, git, event)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-600"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 mt-3 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
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

      {/* Recipes List */}
      <div className="space-y-4">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white dark:bg-slate-850/90 dark:bg-slate-800/80 rounded-2xl border border-slate-200/90 dark:border-slate-700/80 p-4 sm:p-5 space-y-3 transition-colors shadow-xs"
          >
            {/* Header info */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1 flex-wrap">
                  <span className="font-semibold text-emerald-800 dark:text-emerald-400">
                    {recipe.category}
                  </span>
                  <span>·</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700/80 font-medium text-slate-600 dark:text-slate-300">
                    Tingkat: {recipe.difficulty}
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                  {recipe.title}
                </h4>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => handleCopy(recipe.code, recipe.id)}
                  className="min-h-[36px] px-2.5 py-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition active:scale-95 shadow-2xs"
                  title="Salin cuplikan kode"
                >
                  {copiedId === recipe.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-emerald-600 dark:text-emerald-400">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin</span>
                    </>
                  )}
                </button>

                {onSendToLab && recipe.category !== 'Deploy & Git' && (
                  <button
                    type="button"
                    onClick={() => handleOpenInPlayground(recipe)}
                    className="min-h-[36px] px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/80 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition active:scale-95"
                    title="Uji langsung di Lab Code"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Buka di Lab</span>
                  </button>
                )}
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {recipe.description}
            </p>

            {/* Code container */}
            <div className="rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
              <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] text-slate-400 font-mono">
                <span>{recipe.language}</span>
                <span className="text-[10px] text-slate-500">tested snippet</span>
              </div>
              <pre className="p-3 text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed">
                <code>{recipe.code}</code>
              </pre>
            </div>

            {recipe.notes && (
              <p className="text-[11px] text-amber-800 dark:text-amber-300/90 bg-amber-50/70 dark:bg-amber-950/40 p-2.5 rounded-xl border border-amber-200/60 dark:border-amber-800/60">
                <strong>Catatan Penggunaan:</strong> {recipe.notes}
              </p>
            )}

            {/* Tags */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              {recipe.tags.map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/60 px-2 py-0.5 rounded-md border border-slate-200/60 dark:border-slate-800"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
