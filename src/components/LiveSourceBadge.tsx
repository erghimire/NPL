import React, { useState } from 'react';
import { Globe, RefreshCw, CheckCircle2, ExternalLink, Info, Database, Sparkles } from 'lucide-react';

interface LiveSourceBadgeProps {
  isSynced: boolean;
  isSyncing: boolean;
  lastSyncTime: string;
  seasonInfo: string;
  onRefresh: () => void;
}

export const LiveSourceBadge: React.FC<LiveSourceBadgeProps> = ({
  isSynced,
  isSyncing,
  lastSyncTime,
  seasonInfo,
  onRefresh
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border-b border-slate-800/80 px-4 py-2 text-xs">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
          {/* Left: Source Tag */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/30 text-[11px] font-bold">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>LIVE DATA: Wikipedia &amp; Google Cricinfo</span>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold text-emerald-400">NPL 2026 Official Live Feed</span>
              {lastSyncTime && (
                <span className="text-slate-500 font-mono hidden sm:inline">
                  (Synced {lastSyncTime})
                </span>
              )}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onRefresh}
              disabled={isSyncing}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-[11px] font-semibold transition active:scale-95 disabled:opacity-50"
              title="Fetch fresh tournament scores and points table directly from Wikipedia"
            >
              <RefreshCw className={`w-3 h-3 text-blue-400 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync Wikipedia'}</span>
            </button>

            <button
              onClick={() => setShowDetails(true)}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white underline underline-offset-2"
            >
              <Info className="w-3 h-3 text-slate-400" />
              <span className="hidden xs:inline">Source Details</span>
            </button>
          </div>
        </div>
      </div>

      {/* Wikipedia Source Info Modal */}
      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-2xl space-y-4 text-xs text-slate-300">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-sm">
                    Official NPL 2026 Live Data Integration
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Live API feeds from Wikipedia &amp; ESPNcricinfo
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDetails(false)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Active Live Endpoint
              </div>
              <div className="font-mono text-[11px] text-blue-300 bg-slate-900 p-2 rounded border border-slate-800 break-all select-all">
                https://en.wikipedia.org/wiki/2026_Nepal_Premier_League
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Live points table data is parsed directly from Wikipedia's <code>Sports table|CricketRR</code> template, which is dynamically sourced from ESPNcricinfo &amp; Cricclubs.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="font-bold text-white text-xs flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Live Season 2026 Summary
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {seasonInfo}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <a
                href="https://en.wikipedia.org/wiki/2026_Nepal_Premier_League"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-semibold underline"
              >
                <span>Open Wikipedia Article</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                onClick={() => setShowDetails(false)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
