import React, { useState } from 'react';
import { 
  X, 
  Bell, 
  BellRing, 
  BellOff, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Vibrate, 
  Volume2, 
  Smartphone, 
  Flame, 
  Award,
  AlertTriangle,
  Play
} from 'lucide-react';
import { usePushNotifications } from '../hooks/usePushNotifications';

interface NotificationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSimulateWicket?: () => void;
  onSimulateFifty?: () => void;
  onSimulateCentury?: () => void;
}

export const NotificationSettingsModal: React.FC<NotificationSettingsModalProps> = ({
  isOpen,
  onClose,
  onSimulateWicket,
  onSimulateFifty,
  onSimulateCentury
}) => {
  const {
    isSupported,
    permission,
    settings,
    requestPermission,
    updateSettings,
    sendTestNotification,
    justNotified
  } = usePushNotifications();

  const [testingType, setTestingType] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleEnableNotifications = async () => {
    const res = await requestPermission();
    if (res === 'granted') {
      sendTestNotification('general');
    }
  };

  const handleTestTrigger = async (type: 'wicket' | 'milestone' | 'general') => {
    setTestingType(type);
    if (type === 'wicket' && onSimulateWicket) {
      onSimulateWicket();
    } else if (type === 'milestone' && onSimulateFifty) {
      onSimulateFifty();
    } else {
      await sendTestNotification(type);
    }
    setTimeout(() => setTestingType(null), 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-950/80 via-slate-900 to-amber-950/80 p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-900/40 text-white">
              <BellRing className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-white">
                Live Match Push Notifications
              </h2>
              <p className="text-xs text-amber-300">
                Wickets, 50s & 100s alerts in background
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feedback message */}
        {justNotified && (
          <div className="bg-emerald-500/20 border-b border-emerald-500/30 px-4 py-2 text-xs font-semibold text-emerald-300 text-center animate-pulse">
            ✓ {justNotified} Check your device notification tray!
          </div>
        )}

        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs text-slate-300">
          {/* Permission Status Box */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  permission === 'granted'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : permission === 'denied'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}
              >
                {permission === 'granted' ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : permission === 'denied' ? (
                  <BellOff className="w-4 h-4" />
                ) : (
                  <Bell className="w-4 h-4" />
                )}
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  System Status
                </span>
                <span className="font-bold text-white text-xs">
                  {permission === 'granted'
                    ? 'Push Notifications Active'
                    : permission === 'denied'
                    ? 'Notifications Blocked in Browser'
                    : 'Permission Not Yet Granted'}
                </span>
              </div>
            </div>

            {permission !== 'granted' && isSupported && (
              <button
                onClick={handleEnableNotifications}
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-400 hover:to-red-500 text-slate-950 font-bold text-xs transition shadow"
              >
                Allow Alerts
              </button>
            )}

            {permission === 'granted' && (
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                ACTIVE
              </span>
            )}
          </div>

          {/* Toggle Switches */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider text-slate-400">
              Alert Preferences
            </h4>

            {/* Wicket falls */}
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">💥</span>
                <div>
                  <h5 className="font-bold text-white text-xs">Wicket Falls</h5>
                  <p className="text-[11px] text-slate-400">
                    Instant push whenever a wicket falls (dismissed batter, bowler, score)
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.notifyWickets}
                onChange={(e) => updateSettings({ notifyWickets: e.target.checked })}
                className="w-4 h-4 accent-amber-500 cursor-pointer"
              />
            </div>

            {/* 50 & 100 Milestones */}
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">🏏</span>
                <div>
                  <h5 className="font-bold text-white text-xs">50 & 100 Milestones</h5>
                  <p className="text-[11px] text-slate-400">
                    Celebratory alerts when any batter reaches a half-century (50) or century (100)
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.notifyMilestones}
                onChange={(e) => updateSettings({ notifyMilestones: e.target.checked })}
                className="w-4 h-4 accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Sound & Vibration */}
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">📳</span>
                <div>
                  <h5 className="font-bold text-white text-xs">Sound & Vibration</h5>
                  <p className="text-[11px] text-slate-400">
                    Play stadium chime and vibrate phone when push notification arrives
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.soundVibration}
                onChange={(e) => updateSettings({ soundVibration: e.target.checked })}
                className="w-4 h-4 accent-amber-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Test Buttons Section */}
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider text-slate-400 flex items-center justify-between">
              <span>Test Background Notifications</span>
              <span className="text-[10px] text-amber-400 font-normal">Try on your device</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={() => handleTestTrigger('wicket')}
                disabled={testingType === 'wicket'}
                className="p-2.5 rounded-xl bg-gradient-to-r from-red-600/20 to-red-900/30 hover:from-red-600/30 hover:to-red-900/40 border border-red-500/40 text-red-200 font-bold text-xs flex items-center justify-center gap-2 transition active:scale-95"
              >
                <span>💥</span>
                <span>Test Wicket Push Alert</span>
              </button>

              <button
                onClick={() => handleTestTrigger('milestone')}
                disabled={testingType === 'milestone'}
                className="p-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-900/30 hover:from-amber-500/30 hover:to-amber-900/40 border border-amber-500/40 text-amber-200 font-bold text-xs flex items-center justify-center gap-2 transition active:scale-95"
              >
                <span>🏏</span>
                <span>Test 50 Milestone Alert</span>
              </button>
            </div>
          </div>

          {/* How background works explainer */}
          <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 text-[11px] space-y-1.5 text-slate-400">
            <div className="flex items-center gap-2 text-white font-bold text-xs">
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
              <span>How Background Notifications Work:</span>
            </div>
            <p className="leading-relaxed">
              When installed on your Android phone, the <strong>Service Worker</strong> listens in the background. Even if you switch apps, browse Instagram, or lock your phone screen, you will receive real-time push banners with sound whenever a wicket falls or someone scores 50/100!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Service Worker Push API Enabled</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
