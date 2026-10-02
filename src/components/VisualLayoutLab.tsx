import React, { useState } from 'react';
import {
  Layout,
  Maximize2,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Plus,
  Minus,
  Sliders,
  Code2
} from 'lucide-react';

interface VisualLayoutLabProps {
  onSendToLab?: (code: { html: string; css: string; js: string }) => void;
}

export const VisualLayoutLab: React.FC<VisualLayoutLabProps> = ({ onSendToLab }) => {
  const [layoutMode, setLayoutMode] = useState<'flex' | 'grid'>('flex');

  // Flexbox Controls
  const [flexDirection, setFlexDirection] = useState<'row' | 'row-reverse' | 'column' | 'column-reverse'>('row');
  const [justifyContent, setJustifyContent] = useState<
    'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'
  >('center');
  const [alignItems, setAlignItems] = useState<'stretch' | 'flex-start' | 'center' | 'flex-end'>('center');
  const [flexWrap, setFlexWrap] = useState<'nowrap' | 'wrap'>('wrap');
  const [gap, setGap] = useState<number>(16);

  // Grid Controls
  const [gridCols, setGridCols] = useState<number>(3);
  const [gridGap, setGridGap] = useState<number>(16);

  // Boxes count
  const [itemCount, setItemCount] = useState<number>(4);
  const [copiedType, setCopiedType] = useState<'css' | 'tailwind' | null>(null);

  // Compute CSS & Tailwind
  const generatedCss =
    layoutMode === 'flex'
      ? `.container {
  display: flex;
  flex-direction: ${flexDirection};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  flex-wrap: ${flexWrap};
  gap: ${gap}px;
}`
      : `.container {
  display: grid;
  grid-template-columns: repeat(${gridCols}, minmax(0, 1fr));
  gap: ${gridGap}px;
}`;

  const tailwindClasses =
    layoutMode === 'flex'
      ? `flex ${
          flexDirection === 'row'
            ? 'flex-row'
            : flexDirection === 'row-reverse'
            ? 'flex-row-reverse'
            : flexDirection === 'column'
            ? 'flex-col'
            : 'flex-col-reverse'
        } ${
          justifyContent === 'flex-start'
            ? 'justify-start'
            : justifyContent === 'center'
            ? 'justify-center'
            : justifyContent === 'flex-end'
            ? 'justify-end'
            : justifyContent === 'space-between'
            ? 'justify-between'
            : justifyContent === 'space-around'
            ? 'justify-around'
            : 'justify-evenly'
        } ${
          alignItems === 'stretch'
            ? 'items-stretch'
            : alignItems === 'flex-start'
            ? 'items-start'
            : alignItems === 'center'
            ? 'items-center'
            : 'items-end'
        } ${flexWrap === 'wrap' ? 'flex-wrap' : 'flex-nowrap'} gap-${Math.round(gap / 4)}`
      : `grid grid-cols-${gridCols} gap-${Math.round(gridGap / 4)}`;

  const handleCopy = (text: string, type: 'css' | 'tailwind') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleSendToPlayground = () => {
    if (!onSendToLab) return;

    const htmlContent =
      layoutMode === 'flex'
        ? `<div class="${tailwindClasses} p-4 min-h-[300px] bg-slate-100 dark:bg-slate-800 rounded-xl">
${Array.from({ length: itemCount })
  .map(
    (_, i) =>
      `  <div class="p-4 bg-emerald-600 text-white font-bold rounded-lg shadow-sm text-center">
    Modul 0${i + 1}
  </div>`
  )
  .join('\n')}
</div>`
        : `<div class="${tailwindClasses} p-4 bg-slate-100 dark:bg-slate-800 rounded-xl">
${Array.from({ length: itemCount })
  .map(
    (_, i) =>
      `  <div class="p-4 bg-emerald-600 text-white font-bold rounded-lg shadow-sm text-center">
    Kartu 0${i + 1}
  </div>`
  )
  .join('\n')}
</div>`;

    onSendToLab({
      html: htmlContent,
      css: `/* Layout hasil generator visual */\nbody {\n  padding: 1rem;\n  font-family: sans-serif;\n}`,
      js: `console.log('Layout Visual siap dieksperimenkan!');`
    });
  };

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-850/90 dark:bg-slate-800/80 rounded-2xl border border-slate-200/90 dark:border-slate-700/80 p-4 transition-colors">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
              <Sliders className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-tight">
                Visual Layout Studio (Flexbox & Grid)
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Pahami konsep tata letak CSS secara interaktif dengan kode instan
              </p>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700/80 text-xs">
            <button
              onClick={() => setLayoutMode('flex')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                layoutMode === 'flex'
                  ? 'bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Flexbox
            </button>
            <button
              onClick={() => setLayoutMode('grid')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                layoutMode === 'grid'
                  ? 'bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              CSS Grid
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Controls & Live Preview Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Controls Column */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-850/90 dark:bg-slate-800/80 rounded-2xl border border-slate-200/90 dark:border-slate-700/80 p-4 space-y-3.5 transition-colors">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700/60">
            <span className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
              Pengaturan Properti
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                {itemCount} Elemen
              </span>
              <button
                type="button"
                onClick={() => setItemCount((prev) => Math.max(2, prev - 1))}
                className="p-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                title="Kurangi box"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setItemCount((prev) => Math.min(8, prev + 1))}
                className="p-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                title="Tambah box"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {layoutMode === 'flex' ? (
            <>
              {/* Flex Direction */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  flex-direction (Arah Sumbu Utama):
                </label>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  {(['row', 'row-reverse', 'column', 'column-reverse'] as const).map((dir) => (
                    <button
                      key={dir}
                      onClick={() => setFlexDirection(dir)}
                      className={`py-1.5 px-2 rounded-lg font-mono text-[11px] transition border text-left ${
                        flexDirection === dir
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-750'
                      }`}
                    >
                      {dir}
                    </button>
                  ))}
                </div>
              </div>

              {/* Justify Content */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  justify-content (Penyelarasan Sumbu Utama):
                </label>
                <select
                  value={justifyContent}
                  onChange={(e) => setJustifyContent(e.target.value as any)}
                  className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white font-mono focus:outline-none focus:border-emerald-600"
                >
                  <option value="flex-start">flex-start (awal)</option>
                  <option value="center">center (tengah)</option>
                  <option value="flex-end">flex-end (akhir)</option>
                  <option value="space-between">space-between (tepi ke tepi)</option>
                  <option value="space-around">space-around (jarak rata luar-dalam)</option>
                  <option value="space-evenly">space-evenly (jarak identik)</option>
                </select>
              </div>

              {/* Align Items */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  align-items (Penyelarasan Sumbu Silang):
                </label>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  {(['stretch', 'flex-start', 'center', 'flex-end'] as const).map((ai) => (
                    <button
                      key={ai}
                      onClick={() => setAlignItems(ai)}
                      className={`py-1.5 px-2 rounded-lg font-mono text-[11px] transition border text-left ${
                        alignItems === ai
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-750'
                      }`}
                    >
                      {ai}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gap Slider */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  <span>gap (Jarak Antar Item):</span>
                  <span className="font-mono text-emerald-700 dark:text-emerald-400">{gap}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="32"
                  step="4"
                  value={gap}
                  onChange={(e) => setGap(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>
            </>
          ) : (
            <>
              {/* Grid Columns */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  <span>grid-template-columns:</span>
                  <span className="font-mono text-emerald-700 dark:text-emerald-400">
                    repeat({gridCols}, 1fr)
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-1 text-xs">
                  {[1, 2, 3, 4].map((col) => (
                    <button
                      key={col}
                      onClick={() => setGridCols(col)}
                      className={`py-2 rounded-lg font-mono text-center font-bold transition border ${
                        gridCols === col
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-300'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                      }`}
                    >
                      {col} Kolom
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid Gap */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  <span>gap (Jarak Baris & Kolom):</span>
                  <span className="font-mono text-emerald-700 dark:text-emerald-400">{gridGap}px</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="32"
                  step="4"
                  value={gridGap}
                  onChange={(e) => setGridGap(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>
            </>
          )}

          {/* Action: Open in code lab */}
          {onSendToLab && (
            <button
              type="button"
              onClick={handleSendToPlayground}
              className="w-full min-h-[38px] mt-2 py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition active:scale-95 shadow-2xs"
            >
              <Code2 className="w-4 h-4" />
              <span>Buka di Lab Editor Live</span>
            </button>
          )}
        </div>

        {/* Live Visual Canvas & Generated Code Column */}
        <div className="lg:col-span-7 space-y-3">
          {/* Visual Container */}
          <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/90 dark:border-slate-700/80 min-h-[260px] flex flex-col justify-between relative overflow-hidden transition-colors">
            <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-2">
              Container Preview (.container)
            </span>

            {/* The Actual Live Layout */}
            <div
              className="w-full flex-1 rounded-xl p-3 bg-white/70 dark:bg-slate-800/60 border border-dashed border-slate-300 dark:border-slate-700 transition-all duration-300"
              style={
                layoutMode === 'flex'
                  ? {
                      display: 'flex',
                      flexDirection,
                      justifyContent,
                      alignItems,
                      flexWrap,
                      gap: `${gap}px`,
                      minHeight: '200px'
                    }
                  : {
                      display: 'grid',
                      gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
                      gap: `${gridGap}px`,
                      minHeight: '200px'
                    }
              }
            >
              {Array.from({ length: itemCount }).map((_, idx) => (
                <div
                  key={idx}
                  className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white font-mono font-bold text-xs sm:text-sm flex flex-col items-center justify-center shadow-xs transition-all duration-300 min-w-[70px] min-h-[60px]"
                >
                  <span>Item {idx + 1}</span>
                  <span className="text-[9px] font-normal opacity-75 font-sans">
                    {layoutMode === 'flex' ? 'flex item' : 'grid cell'}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
              <span>Sumbu Utama: {layoutMode === 'flex' && flexDirection.includes('row') ? 'Horizontal (X)' : 'Vertikal (Y)'}</span>
              <span className="font-mono">Viewport: Responsif</span>
            </div>
          </div>

          {/* Generated Code Boxes */}
          <div className="bg-white dark:bg-slate-850/90 dark:bg-slate-800/80 rounded-2xl border border-slate-200/90 dark:border-slate-700/80 p-3.5 space-y-2.5 transition-colors">
            {/* Tailwind output */}
            <div className="flex items-center justify-between gap-2 bg-slate-50 dark:bg-slate-900/80 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-700/70">
              <div className="overflow-x-auto min-w-0">
                <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider block">
                  Tailwind CSS Classes:
                </span>
                <code className="text-xs font-mono text-slate-800 dark:text-slate-200 whitespace-nowrap">
                  class="{tailwindClasses}"
                </code>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(`class="${tailwindClasses}"`, 'tailwind')}
                className="p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-emerald-700 text-xs shrink-0 flex items-center gap-1 transition"
                title="Salin class Tailwind"
              >
                {copiedType === 'tailwind' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span className="text-[11px] hidden sm:inline">Salin</span>
              </button>
            </div>

            {/* Pure CSS output */}
            <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 relative">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 text-[11px] text-slate-400">
                <span className="font-mono">style.css</span>
                <button
                  type="button"
                  onClick={() => handleCopy(generatedCss, 'css')}
                  className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px]"
                >
                  {copiedType === 'css' ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Salin CSS</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="text-xs font-mono text-emerald-400 pt-2 leading-relaxed overflow-x-auto">
                <code>{generatedCss}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
