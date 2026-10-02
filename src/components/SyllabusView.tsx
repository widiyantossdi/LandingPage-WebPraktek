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
      <div className="bg-white dark:bg-slate-850/90 dark:bg-slate-800/80 rounded-2xl border border-slate-200/90 dark:border-slate-700/80 p-4 transition-colors">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider block">
              Silabus & Rencana Pembelajaran Semester (RPS)
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
              16 Pertemuan Pemrograman Web
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {COURSE_INFO.prodi} · {COURSE_INFO.kampus} · {COURSE_INFO.sks} SKS
            </p>
          </div>
          <div className="text-right shrink-0">
            <span className="text-2xl font-bold font-mono text-emerald-700 dark:text-emerald-400">
              {completedCount}
              <span className="text-sm font-normal text-slate-400 dark:text-slate-500">/16</span>
            </span>
            <span className="block text-[10px] text-slate-500 dark:text-slate-400">Pertemuan Selesai</span>
          </div>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900/60 rounded-xl mt-4 overflow-x-auto">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 py-1.5 px-2.5 text-xs font-medium rounded-lg transition whitespace-nowrap ${
              filter === 'all'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Semua ({SYLLABUS_DATA.length})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`flex-1 py-1.5 px-2.5 text-xs font-medium rounded-lg transition whitespace-nowrap ${
              filter === 'completed'
                ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Selesai ({completedCount})
          </button>
          <button
            onClick={() => setFilter('in-progress')}
            className={`flex-1 py-1.5 px-2.5 text-xs font-medium rounded-lg transition whitespace-nowrap ${
              filter === 'in-progress'
                ? 'bg-white dark:bg-slate-700 text-amber-800 dark:text-amber-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Sedang Berjalan
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={`flex-1 py-1.5 px-2.5 text-xs font-medium rounded-lg transition whitespace-nowrap ${
              filter === 'upcoming'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
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
              className={`bg-white dark:bg-slate-850/90 dark:bg-slate-800/80 rounded-2xl border transition-all ${
                item.status === 'in-progress'
                  ? 'border-emerald-400 dark:border-emerald-500/80 ring-1 ring-emerald-200 dark:ring-emerald-900/50'
                  : 'border-slate-200/90 dark:border-slate-700/80'
              } overflow-hidden`}
            >
              <button
                type="button"
                onClick={() => setExpandedMeeting(isExpanded ? null : item.meeting)}
                className="w-full text-left p-4 flex items-center justify-between gap-3 hover:bg-slate-50/80 dark:hover:bg-slate-700/40 transition"
              >
                <div className="flex items-start gap-3">
                  {/* Meeting Number Circle */}
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                      item.status === 'completed'
                        ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300'
                        : item.status === 'in-progress'
                        ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 ring-2 ring-amber-300 dark:ring-amber-600/60'
                        : 'bg-slate-100 dark:bg-slate-700/80 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {item.meeting < 10 ? `0${item.meeting}` : item.meeting}
                  </div>

                  <div>
                    {/* Zero-Pill Metadata */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-0.5">
                      <span>{item.dateSchedule}</span>
                      <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
                      <span className="text-slate-600 dark:text-slate-300">{item.category}</span>
                      {item.status === 'in-progress' && (
                        <>
                          <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
                          <span className="font-semibold text-amber-600 dark:text-amber-400">Minggu Ini</span>
                        </>
                      )}
                    </div>

                    <h3 className={`text-sm sm:text-base font-bold text-slate-900 dark:text-white ${isUtsOrUas ? 'text-emerald-900 dark:text-emerald-400' : ''}`}>
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="text-slate-400 dark:text-slate-500 shrink-0">
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </button>

              {/* Collapsible Content */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-100 dark:border-slate-700/60 space-y-3 bg-slate-50/50 dark:bg-slate-900/40">
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>

                  {/* CPMK / Competence Target */}
                  <div className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
                    <Target className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-white block text-[11px] uppercase tracking-wider">
                        Capaian Pembelajaran (CPMK):
                      </span>
                      <span className="text-slate-600 dark:text-slate-300">{item.cpmk}</span>
                    </div>
                  </div>

                  {/* Practical Task & Deliverable */}
                  {item.practicalTask && (
                    <div className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
                      <FileText className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-slate-900 dark:text-white block text-[11px] uppercase tracking-wider">
                          Output Praktikum Lab:
                        </span>
                        <span className="text-slate-600 dark:text-slate-300">{item.practicalTask}</span>
                      </div>
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
