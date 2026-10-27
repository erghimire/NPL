import React, { useState } from 'react';
import { Volume2, VolumeX, Play, Pause, RefreshCw, Smartphone, Sparkles, Bell, BellRing } from 'lucide-react';
import { cricketSound } from '../utils/audio';
import { usePushNotifications } from '../hooks/usePushNotifications';

interface HeaderProps {
  isAutoUpdating: boolean;
  setIsAutoUpdating: (val: boolean) => void;
  onSimulateBall: () => void;
  onResetMatch: () => void;
  onOpenApkModal: () => void;
  onOpenNotificationsModal: () => void;
  lastUpdated: Date;
}

export const Header: React.FC<HeaderProps> = ({
  isAutoUpdating,
  setIsAutoUpdating,
  onSimulateBall,
  onResetMatch,
  onOpenApkModal,
  onOpenNotificationsModal,
  lastUpdated
}) => {
  const [soundEnabled, setSoundEnabled] = useState(cricketSound.enabled);
  const { permission, settings } = usePushNotifications();

  const toggleSound = () => {
    cricketSound.enabled = !cricketSound.enabled;
    setSoundEnabled(cricketSound.enabled);
    if (cricketSound.enabled) {
      cricketSound.playHorn();
    }
  };

  const isNotificationsActive = permission === 'granted' && settings.enabled;

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3 shadow-xl">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer" onClick={onOpenApkModal}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 via-crimson-600 to-indigo-900 p-0.5 shadow-lg shadow-red-500/20">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center overflow-hidden p-0.5">
                <img
                  src="/assets/teams/npl-logo.png"
                  alt="Nepal Premier League Official Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = '/icon.svg';
                  }}
                />
              </div>
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-amber-300 bg-clip-text text-transparent">
                NEPAL PREMIER LEAGUE
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-red-600/30 text-red-400 border border-red-500/40">
                LIVE
              </span>
            </div>
            <p className="text-[11px] text-slate-400 flex items-center gap-1">
              <span>TU Cricket Ground, Kirtipur</span>
              <span>•</span>
              <span className="text-emerald-400 font-mono">
                Auto-sync {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Push Notifications Bell */}
          <button
            onClick={onOpenNotificationsModal}
            className={`relative p-2 rounded-lg border text-xs transition flex items-center gap-1.5 ${
              isNotificationsActive
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 hover:bg-amber-500/30'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
            title="Live Match Push Notifications (Wickets, 50s & 100s)"
          >
            {isNotificationsActive ? (
              <>
                <BellRing className="w-4 h-4 text-amber-400" />
                <span className="w-2 h-2 rounded-full bg-emerald-400 absolute top-1 right-1"></span>
              </>
            ) : (
              <>
                <Bell className="w-4 h-4 text-slate-400" />
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping absolute top-1 right-1"></span>
              </>
            )}
            <span className="hidden md:inline font-semibold text-[11px]">
              {isNotificationsActive ? 'Alerts ON' : 'Alerts'}
            </span>
          </button>

          {/* APK & Play Store Button */}
          <button
            onClick={onOpenApkModal}
            className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs px-2.5 sm:px-3 py-1.5 rounded-lg shadow-md shadow-emerald-900/40 border border-emerald-400/30 transition transform active:scale-95"
            title="Download Android APK / Play Store Publish Guide"
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-100" />
            <span className="hidden xs:inline">Get APK / App</span>
            <span className="xs:hidden">APK</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-lg border text-xs transition ${
              soundEnabled
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 hover:bg-amber-500/30'
                : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:bg-slate-700'
            }`}
            title={soundEnabled ? 'Mute Stadium Audio' : 'Unmute Stadium Audio'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Auto-update Toggle */}
          <button
            onClick={() => setIsAutoUpdating(!isAutoUpdating)}
            className={`flex items-center gap-1 px-2 py-1.5 rounded-lg border text-xs font-medium transition ${
              isAutoUpdating
                ? 'bg-blue-600/20 border-blue-500/40 text-blue-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
            title={isAutoUpdating ? 'Pause automatic live score updates' : 'Resume automatic live updates'}
          >
            {isAutoUpdating ? (
              <>
                <Pause className="w-3.5 h-3.5 text-blue-400" />
                <span className="hidden sm:inline">Auto</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Paused</span>
              </>
            )}
          </button>

          {/* Quick ball simulator (for testing) */}
          <button
            onClick={onSimulateBall}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-400 transition"
            title="Simulate next cricket ball"
          >
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
