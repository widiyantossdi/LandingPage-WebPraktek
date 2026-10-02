import React, { useState, useEffect } from 'react';
import { ClipboardList, CheckCircle2, Clock, ExternalLink, Send, Github, Globe, AlertCircle, FileCheck } from 'lucide-react';
import { ASSIGNMENTS_DATA } from '../data/courseData';
import { Assignment, StudentSubmission } from '../types/course';

export const AssignmentView: React.FC = () => {
  const [submissions, setSubmissions] = useState<Record<string, StudentSubmission>>({});
  const [activeAssignmentForSubmission, setActiveAssignmentForSubmission] = useState<Assignment | null>(null);

  // Form states
  const [studentName, setStudentName] = useState('');
  const [studentNim, setStudentNim] = useState('');
  const [classGroup, setClassGroup] = useState('SI Pagi (A)');
  const [githubUrl, setGithubUrl] = useState('');
  const [cloudflareUrl, setCloudflareUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Load submissions from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('unugha_webprog_submissions');
      if (saved) {
        setSubmissions(JSON.parse(saved));
      }
      const savedProfile = localStorage.getItem('unugha_mhs_profile');
      if (savedProfile) {
        const p = JSON.parse(savedProfile);
        if (p.name) setStudentName(p.name);
        if (p.nim) setStudentNim(p.nim);
        if (p.classGroup) setClassGroup(p.classGroup);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleOpenSubmission = (assignment: Assignment) => {
    setActiveAssignmentForSubmission(assignment);
    setErrorMsg('');
    setSubmitSuccess(false);
    // Prefill if already submitted
    const prev = submissions[assignment.id];
    if (prev) {
      setStudentName(prev.studentName);
      setStudentNim(prev.studentNim);
      setClassGroup(prev.classGroup);
      setGithubUrl(prev.githubUrl);
      setCloudflareUrl(prev.cloudflareUrl);
      setNotes(prev.notes || '');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !studentNim.trim()) {
      setErrorMsg('Nama dan NIM wajib diisi!');
      return;
    }
    if (!githubUrl.trim().includes('github.com')) {
      setErrorMsg('Harap masukkan link GitHub yang valid (misal: https://github.com/username/repo)');
      return;
    }
    if (!cloudflareUrl.trim().includes('pages.dev') && !cloudflareUrl.trim().startsWith('http')) {
      setErrorMsg('Harap masukkan URL live Cloudflare Pages yang valid (contoh: https://proyek.pages.dev)');
      return;
    }

    if (!activeAssignmentForSubmission) return;

    const newSub: StudentSubmission = {
      assignmentId: activeAssignmentForSubmission.id,
      studentName: studentName.trim(),
      studentNim: studentNim.trim(),
      classGroup,
      githubUrl: githubUrl.trim(),
      cloudflareUrl: cloudflareUrl.trim(),
      notes: notes.trim(),
      submittedAt: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    const updated = { ...submissions, [activeAssignmentForSubmission.id]: newSub };
    setSubmissions(updated);
    localStorage.setItem('unugha_webprog_submissions', JSON.stringify(updated));
    localStorage.setItem('unugha_mhs_profile', JSON.stringify({
      name: studentName.trim(),
      nim: studentNim.trim(),
      classGroup
    }));

    setSubmitSuccess(true);
    setTimeout(() => {
      setActiveAssignmentForSubmission(null);
      setSubmitSuccess(false);
    }, 1800);
  };

  return (
    <div className="space-y-4">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
            <ClipboardList className="w-4 h-4" />
          </span>
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            Tugas & Proyek Praktikum
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Kumpulkan tugas perkuliahan dengan menyertakan tautan Repositori GitHub serta URL publik yang telah aktif di Cloudflare Pages.
        </p>
      </div>

      {/* Assignment List */}
      <div className="space-y-4">
        {ASSIGNMENTS_DATA.map((assignment) => {
          const submission = submissions[assignment.id];
          const isSubmitted = !!submission;

          return (
            <div
              key={assignment.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 transition hover:shadow-xs"
            >
              {/* Top Row: Zero-Pill Metadata */}
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-semibold text-emerald-800">
                    Terkait Prt. {assignment.meetingRelated}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1 text-slate-600">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Tenggat: {assignment.deadline}</span>
                  </span>
                </div>

                {isSubmitted ? (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1 text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Terkumpul
                  </span>
                ) : (
                  <span className="text-amber-700 font-medium text-xs">
                    Belum Dikumpulkan
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-2">
                {assignment.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 mb-3 leading-relaxed">
                {assignment.description}
              </p>

              {/* Requirements List */}
              <div className="space-y-1.5 mb-4">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Ketentuan Pengerjaan:
                </span>
                <ul className="space-y-1">
                  {assignment.requirements.map((req, rIdx) => (
                    <li key={rIdx} className="text-xs text-slate-700 flex items-start gap-2">
                      <span className="text-emerald-600 font-bold shrink-0">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Rubric Breakdown */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 mb-4">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                  Bobot Penilaian:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                  {assignment.rubric.map((r, rIdx) => (
                    <div key={rIdx} className="flex justify-between items-center pr-2">
                      <span className="truncate pr-1">{r.criteria}</span>
                      <strong className="font-mono font-semibold text-slate-800">{r.weight}%</strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Previous Submission Box if exists */}
              {submission && (
                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 mb-4 text-xs text-slate-700 space-y-1">
                  <div className="font-semibold text-emerald-900 flex items-center justify-between">
                    <span>Data Pengumpulan:</span>
                    <span className="text-[11px] text-emerald-700 font-normal">{submission.submittedAt}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 truncate">
                    <Github className="w-3.5 h-3.5 shrink-0 text-slate-700" />
                    <a
                      href={submission.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-700 hover:underline truncate"
                    >
                      {submission.githubUrl}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 truncate">
                    <Globe className="w-3.5 h-3.5 shrink-0 text-slate-700" />
                    <a
                      href={submission.cloudflareUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-700 hover:underline truncate"
                    >
                      {submission.cloudflareUrl}
                    </a>
                  </div>
                </div>
              )}

              {/* Action Button */}
              <button
                type="button"
                onClick={() => handleOpenSubmission(assignment)}
                className={`w-full min-h-[44px] py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition active:scale-[0.98] ${
                  isSubmitted
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
                    : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitted ? 'Perbarui Tautan Tugas' : 'Kumpulkan Tugas Ini'}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Submission Modal */}
      {activeAssignmentForSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-3xl p-5 sm:p-6 shadow-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                  Formulir Pengumpulan Praktikum
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  {activeAssignmentForSubmission.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveAssignmentForSubmission(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {submitSuccess && (
              <div className="p-3 mb-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Tugas berhasil disimpan! Data tersimpan di perangkat Anda.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Lengkap Mahasiswa *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Muhammad Ilham"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    NIM Mahasiswa *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 24201089"
                    value={studentNim}
                    onChange={(e) => setStudentNim(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-600 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Kelas SI
                  </label>
                  <select
                    value={classGroup}
                    onChange={(e) => setClassGroup(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-600 bg-white"
                  >
                    <option value="SI Pagi (A)">SI Pagi (Kelas A)</option>
                    <option value="SI Pagi (B)">SI Pagi (Kelas B)</option>
                    <option value="SI Sore/Karyawan">SI Karyawan/Sore</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Github className="w-3.5 h-3.5" />
                  URL Repositori GitHub *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://github.com/username/proyek-web-si"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-600 font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-emerald-600" />
                  URL Live Cloudflare Pages *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://tugas-web-unugha.pages.dev"
                  value={cloudflareUrl}
                  onChange={(e) => setCloudflareUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-600 font-mono text-xs"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Pastikan web Anda dapat dibuka secara publik melalui domain .pages.dev
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Catatan untuk Dosen Pengampu (Opsional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Contoh: Fitur kalkulator responsif di smartphone resolusi 375px."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-600 text-xs"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveAssignmentForSubmission(null)}
                  className="min-h-[44px] px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="min-h-[44px] px-5 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs"
                >
                  Kirim & Simpan Bukti
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
