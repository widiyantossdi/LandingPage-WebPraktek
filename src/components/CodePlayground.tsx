import React, { useState, useEffect, useMemo } from 'react';
import { Play, RotateCcw, Copy, Check, Eye, Code, Sparkles } from 'lucide-react';

interface CodePlaygroundProps {
  initialCode?: {
    html: string;
    css: string;
    js: string;
  } | null;
}

const PRESETS = [
  {
    id: 'kartu-mhs',
    name: 'Kartu Profil SI UNUGHA',
    html: `<div class="card">
  <div class="avatar">SI</div>
  <h2>Ahmad Fauzi</h2>
  <p class="nim">NIM: 24201045 · Prodi SI</p>
  <p class="univ">Universitas Nahdlatul Ulama Al Ghazali Cilacap</p>
  <button id="btnSapa">Kirim Salam</button>
  <p id="hasilSapa" class="pesan"></p>
</div>`,
    css: `body {
  font-family: system-ui, sans-serif;
  background: #f1f5f9;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  margin: 0;
  padding: 16px;
}
.card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  max-width: 320px;
  width: 100%;
  text-align: center;
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.08);
  border: 1px solid #e2e8f0;
}
.avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #047857;
  color: white;
  font-weight: bold;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
}
h2 { margin: 0 0 4px; color: #0f172a; font-size: 18px; }
.nim { color: #059669; font-weight: 600; font-size: 13px; margin: 0 0 8px; }
.univ { color: #64748b; font-size: 12px; margin: 0 0 16px; }
button {
  background: #059669;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
}
button:hover { background: #047857; }
.pesan { margin-top: 12px; font-size: 13px; color: #0f172a; font-weight: 500; }`,
    js: `const btn = document.getElementById('btnSapa');
const hasil = document.getElementById('hasilSapa');

btn.addEventListener('click', () => {
  hasil.textContent = '👋 Salam hangat dari Mahasiswa SI UNUGHA Cilacap!';
});`
  },
  {
    id: 'kalkulator-ipk',
    name: 'Simulasi Hitung Nilai Web',
    html: `<div class="box">
  <h3>Kalkulator Pemrograman Web</h3>
  <label>Nilai Tugas (30%):</label>
  <input type="number" id="tugas" value="85" max="100">
  
  <label>Nilai UTS (30%):</label>
  <input type="number" id="uts" value="80" max="100">
  
  <label>Nilai UAS (40%):</label>
  <input type="number" id="uas" value="90" max="100">
  
  <button id="btnHitung">Hitung Nilai Akhir</button>
  <div id="output" class="result">Klik hitung untuk melihat nilai</div>
</div>`,
    css: `body {
  font-family: system-ui, sans-serif;
  background: #fafafa;
  padding: 20px;
}
.box {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 18px;
  max-width: 320px;
  margin: 0 auto;
}
h3 { margin-top: 0; color: #065f46; font-size: 16px; }
label { display: block; font-size: 12px; color: #475569; margin: 8px 0 4px; }
input {
  width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 14px;
}
button {
  width: 100%;
  margin-top: 14px;
  padding: 10px;
  background: #059669;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}
.result {
  margin-top: 14px;
  padding: 10px;
  background: #ecfdf5;
  color: #065f46;
  border-radius: 8px;
  font-size: 13px;
  text-align: center;
  font-weight: 600;
}`,
    js: `document.getElementById('btnHitung').addEventListener('click', () => {
  const tugas = parseFloat(document.getElementById('tugas').value) || 0;
  const uts = parseFloat(document.getElementById('uts').value) || 0;
  const uas = parseFloat(document.getElementById('uas').value) || 0;
  
  const nilaiAkhir = (tugas * 0.3) + (uts * 0.3) + (uas * 0.4);
  let grade = 'E';
  if (nilaiAkhir >= 85) grade = 'A (Sangat Memuaskan)';
  else if (nilaiAkhir >= 75) grade = 'B (Baik)';
  else if (nilaiAkhir >= 60) grade = 'C (Cukup)';
  else grade = 'D (Kurang)';

  document.getElementById('output').innerHTML = 
    'Nilai Akhir: ' + nilaiAkhir.toFixed(1) + '<br>Grade: ' + grade;
});`
  }
];

export const CodePlayground: React.FC<CodePlaygroundProps> = ({ initialCode }) => {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [viewMode, setViewMode] = useState<'editor' | 'preview'>('editor');
  const [htmlCode, setHtmlCode] = useState(PRESETS[0].html);
  const [cssCode, setCssCode] = useState(PRESETS[0].css);
  const [jsCode, setJsCode] = useState(PRESETS[0].js);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialCode) {
      setHtmlCode(initialCode.html);
      setCssCode(initialCode.css);
      setJsCode(initialCode.js);
    }
  }, [initialCode]);

  const combinedOutput = useMemo(() => {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>${cssCode}</style>
</head>
<body>
  ${htmlCode}
  <script>
    try {
      ${jsCode}
    } catch (err) {
      console.error(err);
    }
  </script>
</body>
</html>`;
  }, [htmlCode, cssCode, jsCode]);

  const handleSelectPreset = (preset: typeof PRESETS[0]) => {
    setHtmlCode(preset.html);
    setCssCode(preset.css);
    setJsCode(preset.js);
  };

  const handleReset = () => {
    setHtmlCode(PRESETS[0].html);
    setCssCode(PRESETS[0].css);
    setJsCode(PRESETS[0].js);
  };

  const handleCopy = () => {
    let currentCode = htmlCode;
    if (activeTab === 'css') currentCode = cssCode;
    if (activeTab === 'js') currentCode = jsCode;
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Introduction Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
              <Code className="w-4 h-4" />
            </span>
            <h2 className="text-sm sm:text-base font-bold text-slate-900">
              Lab Code Mahasiswa SI
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Live Browser Sandbox
          </span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed mb-3">
          Tulis dan uji coba kode HTML, CSS, dan JavaScript secara langsung di smartphone tanpa perlu install compiler.
        </p>

        {/* Preset Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <span className="text-[11px] font-semibold text-slate-400 shrink-0">Preset:</span>
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 whitespace-nowrap transition"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Editor & Preview Container */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-sm flex flex-col">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border-b border-slate-800">
          {/* Sub tabs: HTML, CSS, JS */}
          <div className="flex items-center gap-1 p-0.5 bg-slate-950 rounded-lg">
            <button
              onClick={() => setActiveTab('html')}
              className={`px-3 py-1 text-xs font-mono font-medium rounded-md transition ${
                activeTab === 'html'
                  ? 'bg-emerald-700 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              HTML
            </button>
            <button
              onClick={() => setActiveTab('css')}
              className={`px-3 py-1 text-xs font-mono font-medium rounded-md transition ${
                activeTab === 'css'
                  ? 'bg-emerald-700 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              CSS
            </button>
            <button
              onClick={() => setActiveTab('js')}
              className={`px-3 py-1 text-xs font-mono font-medium rounded-md transition ${
                activeTab === 'js'
                  ? 'bg-emerald-700 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              JS
            </button>
          </div>

          {/* Mode Switch (Editor vs Preview on mobile) */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCopy}
              className="min-h-[36px] px-2.5 rounded-lg text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 text-xs flex items-center gap-1 transition"
              title="Salin kode tab aktif"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="text-[11px] hidden xs:inline">{copied ? 'Tersalin' : 'Salin'}</span>
            </button>

            <button
              onClick={handleReset}
              className="min-h-[36px] p-2 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition"
              title="Reset ke awal"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center p-0.5 bg-slate-950 rounded-lg sm:hidden">
              <button
                onClick={() => setViewMode('editor')}
                className={`p-1.5 rounded-md text-xs transition ${
                  viewMode === 'editor' ? 'bg-slate-800 text-emerald-400' : 'text-slate-500'
                }`}
                title="Editor Mode"
              >
                <Code className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('preview')}
                className={`p-1.5 rounded-md text-xs transition ${
                  viewMode === 'preview' ? 'bg-slate-800 text-emerald-400' : 'text-slate-500'
                }`}
                title="Live Preview"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-800 min-h-[320px]">
          {/* Editor Column */}
          <div className={`${viewMode === 'preview' ? 'hidden sm:block' : 'block'} flex flex-col`}>
            <div className="px-3 py-1.5 bg-slate-900/50 text-[10px] text-slate-400 font-mono flex items-center justify-between">
              <span>Editor ({activeTab.toUpperCase()})</span>
              <span className="text-slate-500">Ketik untuk mencoba</span>
            </div>
            {activeTab === 'html' && (
              <textarea
                value={htmlCode}
                onChange={(e) => setHtmlCode(e.target.value)}
                className="w-full flex-1 p-3 bg-slate-950 text-slate-100 font-mono text-xs leading-relaxed resize-none focus:outline-none min-h-[280px]"
                spellCheck={false}
                placeholder="<!-- Ketik kode HTML di sini -->"
              />
            )}
            {activeTab === 'css' && (
              <textarea
                value={cssCode}
                onChange={(e) => setCssCode(e.target.value)}
                className="w-full flex-1 p-3 bg-slate-950 text-emerald-300 font-mono text-xs leading-relaxed resize-none focus:outline-none min-h-[280px]"
                spellCheck={false}
                placeholder="/* Ketik style CSS di sini */"
              />
            )}
            {activeTab === 'js' && (
              <textarea
                value={jsCode}
                onChange={(e) => setJsCode(e.target.value)}
                className="w-full flex-1 p-3 bg-slate-950 text-amber-200 font-mono text-xs leading-relaxed resize-none focus:outline-none min-h-[280px]"
                spellCheck={false}
                placeholder="// Ketik logika JavaScript di sini"
              />
            )}
          </div>

          {/* Live Preview Column */}
          <div className={`${viewMode === 'editor' ? 'hidden sm:flex' : 'flex'} flex-col bg-white`}>
            <div className="px-3 py-1.5 bg-slate-100 border-b border-slate-200 text-[10px] text-slate-600 font-semibold flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Preview
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Rendered Output</span>
            </div>
            <iframe
              srcDoc={combinedOutput}
              title="Preview Hasil Kode"
              sandbox="allow-scripts"
              className="w-full flex-1 border-0 min-h-[280px] bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
