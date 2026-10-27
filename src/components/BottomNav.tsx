import React from 'react';
import { Activity, Trophy, Calendar, Users, Award, Smartphone } from 'lucide-react';

export type TabType = 'live' | 'table' | 'fixtures' | 'teams' | 'stats' | 'apk';

interface BottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenApkModal: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenApkModal
}) => {
  const navItems: { id: TabType; label: string; icon: React.ReactNode; isSpecial?: boolean }[] = [
    {
      id: 'live',
      label: 'Live Score',
      icon: <Activity className="w-4 h-4" />
    },
    {
      id: 'table',
      label: 'Points Table',
      icon: <Trophy className="w-4 h-4" />
    },
    {
      id: 'fixtures',
      label: 'Fixtures',
      icon: <Calendar className="w-4 h-4" />
    },
    {
      id: 'teams',
      label: 'Teams',
      icon: <Users className="w-4 h-4" />
    },
    {
      id: 'stats',
      label: 'Cap Stats',
      icon: <Award className="w-4 h-4" />
    },
    {
      id: 'apk',
      label: 'Get APK',
      icon: <Smartphone className="w-4 h-4" />,
      isSpecial: true
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800/80 px-2 py-1.5 shadow-2xl safe-area-bottom">
      <div className="max-w-lg mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'apk') {
                  onOpenApkModal();
                } else {
                  setActiveTab(item.id);
                }
              }}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all relative ${
                item.isSpecial
                  ? 'text-emerald-400 hover:text-emerald-300 font-bold'
                  : isActive
                  ? 'text-amber-400 font-bold scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                {item.icon}
                {item.id === 'live' && (
                  <span className="absolute -top-1 -right-1.5 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                )}
                {item.isSpecial && (
                  <span className="absolute -top-1 -right-2 px-1 rounded-full bg-emerald-500 text-[8px] text-slate-950 font-black">
                    APK
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight">
                {item.label}
              </span>
              {isActive && !item.isSpecial && (
                <span className="w-4 h-0.5 rounded-full bg-amber-400 mt-0.5"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
