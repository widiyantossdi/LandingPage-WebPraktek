import React, { useState } from 'react';
import { Calendar, CheckCircle2, Clock, ChevronDown, ChevronUp, FileText, Target, BookOpen } from 'lucide-react';
import { SYLLABUS_DATA, COURSE_INFO } from '../data/courseData';
import { SyllabusItem } from '../types/course';

export const SyllabusView: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'completed' | 'in-progress' | 'upcoming'>('all');
  const [expandedMeeting, setExpandedMeeting] = useState<number | null>(5); // default open current week

  const filteredItems = SYLLABUS_DATA.filter((item) => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  const completedCount = SYLLABUS_DATA.filter((s) => s.status === 'completed').length;

  return (
    <div className="space-y-4">
      {/* Course Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
              Silabus & Rencana Pembelajaran Semester (RPS)
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
              16 Pertemuan Pemrograman Web
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {COURSE_INFO.prodi} · {COURSE_INFO.kampus} · {COURSE_INFO.sks} SKS
            </p>
          </div>
          <div className="text-right shrink-0">
            <span className="text-2xl font-bold font-mono text-emerald-700">
              {completedCount}
              <span className="text-sm font-normal text-slate-400">/16</span>
            </span>
            <span className="block text-[10px] text-slate-500">Pertemuan Selesai</span>
          </div>
        </div>

        {/* Filter Segmented Control (allowed by constitution) */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl mt-4 overflow-x-auto">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 py-1.5 px-2.5 text-xs font-medium rounded-lg transition whitespace-nowrap ${
              filter === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Semua ({SYLLABUS_DATA.length})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`flex-1 py-1.5 px-2.5 text-xs font-medium rounded-lg transition whitespace-nowrap ${
              filter === 'completed'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Selesai ({completedCount})
          </button>
          <button
            onClick={() => setFilter('in-progress')}
            className={`flex-1 py-1.5 px-2.5 text-xs font-medium rounded-lg transition whitespace-nowrap ${
              filter === 'in-progress'
                ? 'bg-white text-amber-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sedang Berjalan
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={`flex-1 py-1.5 px-2.5 text-xs font-medium rounded-lg transition whitespace-nowrap ${
              filter === 'upcoming'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Mendatang
          </button>
        </div>
      </div>

      {/* Syllabus Meeting Cards */}
      <div className="space-y-3">
        {filteredItems.map((item) => {
          const isExpanded = expandedMeeting === item.meeting;
          const isUtsOrUas = item.meeting === 8 || item.meeting === 16;

          return (
            <div
              key={item.meeting}
              className={`bg-white rounded-2xl border transition-all ${
                item.status === 'in-progress'
                  ? 'border-emerald-400 ring-1 ring-emerald-200'
                  : 'border-slate-200/90'
              } overflow-hidden`}
            >
              <button
                type="button"
                onClick={() => setExpandedMeeting(isExpanded ? null : item.meeting)}
                className="w-full text-left p-4 flex items-center justify-between gap-3 hover:bg-slate-50/80 transition"
              >
                <div className="flex items-start gap-3">
                  {/* Meeting Number Circle */}
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                      item.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.status === 'in-progress'
                        ? 'bg-amber-100 text-amber-900 ring-2 ring-amber-300'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.meeting < 10 ? `0${item.meeting}` : item.meeting}
                  </div>

                  <div>
                    {/* Zero-Pill Metadata */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-0.5">
                      <span>{item.dateSchedule}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.category}</span>
                      {item.status === 'in-progress' && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="font-semibold text-amber-600">Minggu Ini</span>
                        </>
                      )}
                    </div>

                    <h3 className={`text-sm sm:text-base font-bold text-slate-900 ${isUtsOrUas ? 'text-emerald-900' : ''}`}>
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {item.status === 'completed' && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 hidden xs:block" />
                  )}
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Collapsible Details */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-100 space-y-3 bg-slate-50/50">
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {item.description}
                  </p>

                  {/* CPMK */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-xs">
                    <span className="font-bold text-emerald-800 flex items-center gap-1.5 mb-1">
                      <Target className="w-3.5 h-3.5" />
                      Capaian Pembelajaran (CPMK):
                    </span>
                    <p className="text-slate-600">{item.cpmk}</p>
                  </div>

                  {/* Materials */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Materi & Lembar Praktikum:
                    </span>
                    <ul className="space-y-1">
                      {item.materials.map((m, mIdx) => (
                        <li key={mIdx} className="text-xs text-slate-700 flex items-center gap-2">
                          <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Practical Task if any */}
                  {item.practicalTask && (
                    <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200/70 text-xs text-amber-900">
                      <strong>Tugas Praktikum:</strong> {item.practicalTask}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
