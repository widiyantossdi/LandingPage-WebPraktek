import React from 'react';
import { BookOpen, Calendar, Code2, ClipboardList, CloudLightning } from 'lucide-react';

export type TabType = 'materi' | 'silabus' | 'lab' | 'tugas' | 'panduan';

interface BottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  unsubmittedAssignmentsCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  unsubmittedAssignmentsCount = 0
}) => {
  const tabs = [
    {
      id: 'materi' as TabType,
      label: 'Materi',
      icon: BookOpen
    },
    {
      id: 'silabus' as TabType,
      label: 'Silabus',
      icon: Calendar
    },
    {
      id: 'lab' as TabType,
      label: 'Lab Code',
      icon: Code2
    },
    {
      id: 'tugas' as TabType,
      label: 'Tugas',
      icon: ClipboardList,
      badge: unsubmittedAssignmentsCount > 0 ? unsubmittedAssignmentsCount : null
    },
    {
      id: 'panduan' as TabType,
      label: 'Deploy',
      icon: CloudLightning
    }
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 safe-area-bottom shadow-lg"
      aria-label="Navigasi Utama Aplikasi"
    >
      <div className="max-w-md mx-auto grid grid-cols-5 items-center h-16 px-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative flex flex-col items-center justify-center min-h-[48px] py-1 text-center transition-colors group"
            >
              <div
                className={`relative p-1 rounded-xl transition-all duration-150 ${
                  isActive
                    ? 'text-emerald-700 bg-emerald-50'
                    : 'text-slate-500 group-hover:text-slate-800'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-105 stroke-[2.2]' : 'stroke-[1.8]'}`} />
                {tab.badge && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-white shadow-xs">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[11px] font-medium tracking-tight mt-0.5 whitespace-nowrap ${
                  isActive ? 'text-emerald-700 font-semibold' : 'text-slate-500 group-hover:text-slate-800'
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-4 h-0.5 bg-emerald-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
