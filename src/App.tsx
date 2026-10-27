import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LiveScoreCard } from './components/LiveScoreCard';
import { PointsTable } from './components/PointsTable';
import { Fixtures } from './components/Fixtures';
import { TeamsList } from './components/TeamsList';
import { StatsLeaders } from './components/StatsLeaders';
import { FanZone } from './components/FanZone';
import { ApkExportModal } from './components/ApkExportModal';
import { NotificationSettingsModal } from './components/NotificationSettingsModal';
import { BottomNav, TabType } from './components/BottomNav';
import { useLiveMatchSimulation } from './hooks/useLiveMatchSimulation';
import { usePWAInstall } from './hooks/usePWAInstall';
import { usePushNotifications } from './hooks/usePushNotifications';
import { 
  Flame, 
  Smartphone, 
  Download, 
  Trophy, 
  Sparkles, 
  RefreshCw, 
  WifiOff, 
  ChevronRight,
  Shield,
  Activity,
  BellRing,
  Bell
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('live');
  const [isApkModalOpen, setIsApkModalOpen] = useState(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

  const { permission, requestPermission } = usePushNotifications();

  const {
    matches,
    standings,
    isAutoUpdating,
    setIsAutoUpdating,
    lastUpdatedTime,
    eventAlert,
    simulateNextBall,
    resetMatch
  } = useLiveMatchSimulation();

  const { isInstallable, isInstalled, install } = usePWAInstall();

  // Network listener
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const liveMatch = matches.find((m) => m.status === 'live') || matches[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col pb-20 selection:bg-amber-500 selection:text-slate-950">
      {/* Offline Alert Indicator */}
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-amber-600 text-white text-xs font-semibold px-4 py-2 text-center flex items-center justify-center gap-2 shadow-lg">
          <WifiOff className="w-4 h-4" />
          <span>Offline Mode active — Showing cached NPL scores & standings</span>
        </div>
      )}

      {/* Main App Header */}
      <Header
        isAutoUpdating={isAutoUpdating}
        setIsAutoUpdating={setIsAutoUpdating}
        onSimulateBall={simulateNextBall}
        onResetMatch={resetMatch}
        onOpenApkModal={() => setIsApkModalOpen(true)}
        onOpenNotificationsModal={() => setIsNotificationsModalOpen(true)}
        lastUpdated={lastUpdatedTime}
      />

      {/* Push Notification Call-to-Action Banner */}
      {permission === 'default' && (
        <div className="bg-gradient-to-r from-amber-500/15 via-red-500/10 to-amber-500/15 border-b border-amber-500/30 px-4 py-2">
          <div className="max-w-5xl mx-auto flex items-center justify-between gap-3 text-xs flex-wrap">
            <div className="flex items-center gap-2 text-amber-200">
              <BellRing className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Get instant push notifications when <strong>wickets fall</strong> or <strong>50/100 runs</strong> are scored in the background!</span>
            </div>
            <button
              onClick={async () => {
                const res = await requestPermission();
                if (res === 'granted') setIsNotificationsModalOpen(true);
              }}
              className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition shadow shrink-0"
            >
              Enable Push Alerts
            </button>
          </div>
        </div>
      )}

      {/* Event Alert Flash Toast (Six, Four, Wicket, Win) */}
      {eventAlert && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-full shadow-2xl backdrop-blur-md border animate-bounce flex items-center gap-2 text-xs font-black tracking-wider transition-all duration-300 bg-slate-900 text-white border-amber-400">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{eventAlert.text}</span>
        </div>
      )}

      {/* Hero Quick Ticker / Fast PWA Promo Banner */}
      <div className="bg-gradient-to-r from-red-950/60 via-slate-900 to-indigo-950/60 border-b border-slate-800/60 px-4 py-2">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-xs flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-semibold text-slate-300">
              Live from Tribhuvan University Ground, Kirtipur, Nepal
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsNotificationsModalOpen(true)}
              className="flex items-center gap-1 text-[11px] font-bold text-amber-300 hover:text-amber-200 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20"
            >
              <Bell className="w-3 h-3 text-amber-400" />
              <span>Notification Settings</span>
            </button>

            {isInstallable && !isInstalled && (
              <button
                onClick={install}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] shadow transition"
              >
                <Download className="w-3 h-3" />
                <span>Install Mobile App</span>
              </button>
            )}

            <button
              onClick={() => setIsApkModalOpen(true)}
              className="text-emerald-400 hover:text-emerald-300 text-[11px] font-semibold flex items-center gap-1 underline underline-offset-2"
            >
              <span>Download APK / Play Store Guide</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-3 sm:p-5">
        {/* TAB: LIVE SCORE & MATCH DETAILS */}
        {activeTab === 'live' && (
          <div>
            <LiveScoreCard
              match={liveMatch}
              onSimulateBall={simulateNextBall}
              onResetMatch={resetMatch}
              onOpenNotificationsModal={() => setIsNotificationsModalOpen(true)}
            />

            {/* Quick Points Preview inside Live Tab */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  Live Points Table (Automatic NRR Calculation)
                </h3>
                <button
                  onClick={() => setActiveTab('table')}
                  className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  <span>View Full Table</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <PointsTable standings={standings} onSelectTeam={() => setActiveTab('teams')} />
            </div>

            {/* Fan Zone & Live Prediction Poll */}
            <FanZone />
          </div>
        )}

        {/* TAB: POINTS TABLE */}
        {activeTab === 'table' && (
          <div>
            <PointsTable standings={standings} onSelectTeam={() => setActiveTab('teams')} />
            
            {/* Playoff Qualifier Explainer */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
              <h4 className="font-extrabold text-white text-sm flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                NPL Playoff & Final Road Map
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase block mb-1">
                    Qualifier 1
                  </span>
                  <p className="font-bold text-white">Rank 1 vs Rank 2</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Winner goes straight to Final. Loser gets 2nd chance in Qualifier 2.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-blue-950/20 border border-blue-500/30">
                  <span className="text-[10px] font-bold text-blue-400 uppercase block mb-1">
                    Eliminator
                  </span>
                  <p className="font-bold text-white">Rank 3 vs Rank 4</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Knockout match. Loser is eliminated from NPL. Winner advances to Qualifier 2.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/30">
                  <span className="text-[10px] font-bold text-amber-400 uppercase block mb-1">
                    Grand Final
                  </span>
                  <p className="font-bold text-white">Winner Q1 vs Winner Q2</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Champions crowned with trophy & 1 Crore NRS prize at TU Cricket Ground!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: FIXTURES & SCHEDULE */}
        {activeTab === 'fixtures' && (
          <div>
            <Fixtures matches={matches} onSelectMatch={() => setActiveTab('live')} />
          </div>
        )}

        {/* TAB: 8 NPL FRANCHISES & SQUADS */}
        {activeTab === 'teams' && (
          <div>
            <TeamsList />
          </div>
        )}

        {/* TAB: STATS & CAPS */}
        {activeTab === 'stats' && (
          <div>
            <StatsLeaders />
          </div>
        )}
      </main>

      {/* APK & Play Store Non-Coder Guide Modal */}
      <ApkExportModal
        isOpen={isApkModalOpen}
        onClose={() => setIsApkModalOpen(false)}
      />

      {/* Push Notification Settings Modal */}
      <NotificationSettingsModal
        isOpen={isNotificationsModalOpen}
        onClose={() => setIsNotificationsModalOpen(false)}
        onSimulateWicket={() => simulateNextBall('wicket')}
        onSimulateFifty={() => simulateNextBall('fifty')}
        onSimulateCentury={() => simulateNextBall('century')}
      />

      {/* Mobile Native Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenApkModal={() => setIsApkModalOpen(true)}
      />
    </div>
  );
}
