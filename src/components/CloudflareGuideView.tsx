import React, { useState } from 'react';
import { CloudLightning, Check, Copy, Terminal, ExternalLink, ShieldCheck, Mail, MapPin, Building, GraduationCap, Laptop } from 'lucide-react';
import { CLOUDFLARE_PAGES_GUIDE, COURSE_INFO } from '../data/courseData';

export const CloudflareGuideView: React.FC = () => {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const checklistItems = [
    { title: 'Jalankan `npm run build` lokal', desc: 'Pastikan tidak ada error kompilasi TypeScript atau Vite.' },
    { title: 'Periksa folder `dist`', desc: 'Folder dist harus terisi file index.html dan folder assets/.' },
    { title: 'Uji responsivitas di smartphone', desc: 'Pastikan tata letak tidak ada horizontal scroll yang bocor.' },
    { title: 'Sediakan file SPA `_redirects`', desc: 'Untuk React SPA, Cloudflare Pages otomatis mendukung single-page apps.' }
  ];

  return (
    <div className="space-y-4">
      {/* Hero Banner Cloudflare Pages */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <CloudLightning className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
              Panduan Deployment Edge
            </span>
            <h2 className="text-base sm:text-lg font-bold">
              Deploy ke Cloudflare Pages
            </h2>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
          Aplikasi web perkuliahan Anda dapat di-hosting secara gratis, cepat, dan aman melalui infrastruktur global Cloudflare Pages.
        </p>

        {/* Quick Command Box */}
        <div className="bg-slate-950/80 rounded-2xl p-3 border border-slate-700/80">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-mono">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              Build Command Vite
            </span>
            <button
              onClick={() => handleCopy('npm run build', 'build-cmd')}
              className="text-slate-300 hover:text-white flex items-center gap-1 text-[11px]"
            >
              {copiedCmd === 'build-cmd' ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Tersalin</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Salin</span>
                </>
              )}
            </button>
          </div>
          <code className="text-xs font-mono text-emerald-300 block">npm run build</code>
        </div>
      </div>

      {/* 4 Steps Walkthrough */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
          <span>Langkah Praktis Deployment</span>
        </h3>

        <div className="space-y-4">
          {CLOUDFLARE_PAGES_GUIDE.map((step) => (
            <div key={step.step} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-800 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                0{step.step}
              </div>
              <div className="space-y-1">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.description}
                </p>
                {step.command && (
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-slate-100 rounded-lg text-xs font-mono text-slate-800 my-1">
                    <span>{step.command}</span>
                    <button
                      onClick={() => handleCopy(step.command!, `step-${step.step}`)}
                      className="text-slate-500 hover:text-slate-900"
                    >
                      {copiedCmd === `step-${step.step}` ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                )}
                <p className="text-[11px] text-slate-500 leading-normal">
                  {step.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* External Link Button */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-2">
          <a
            href="https://dash.cloudflare.com"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto flex-1 min-h-[44px] px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition"
          >
            <span>Buka Cloudflare Dashboard</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Pre-Deploy Checklist */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4">
        <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Checklist Kesiapan Deploy Tugas Mahasiswa</span>
        </h3>
        <div className="space-y-2 mt-2">
          {checklistItems.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-emerald-600 font-bold text-sm shrink-0">✓</span>
              <div>
                <p className="text-xs font-semibold text-slate-800">{item.title}</p>
                <p className="text-[11px] text-slate-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Course & Lecturer Contact Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-xs">
            FTI
          </div>
          <div>
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
              Dosen Pengampu & Informasi Kuliah
            </span>
            <h3 className="text-base font-bold text-slate-900">
              {COURSE_INFO.dosen}
            </h3>
            <p className="text-xs text-slate-600">
              Program Studi {COURSE_INFO.prodi} · {COURSE_INFO.fakultas}
            </p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Email Resmi:</span>
            <a
              href={`mailto:${COURSE_INFO.dosenEmail}`}
              className="font-mono text-emerald-800 font-semibold hover:underline"
            >
              {COURSE_INFO.dosenEmail}
            </a>
          </div>

          <div className="flex items-start gap-2">
            <Building className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <span>
              <strong>{COURSE_INFO.kampus}</strong>
              <span className="block text-[11px] text-slate-500 mt-0.5">
                {COURSE_INFO.alamat}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Laptop className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Ruang Kuliah: <strong>{COURSE_INFO.ruangKuliah}</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Jadwal: <strong>{COURSE_INFO.jadwal}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};
