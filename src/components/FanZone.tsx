import React, { useState } from 'react';
import { Flame, ThumbsUp, Volume2, Sparkles, Heart, Trophy, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cricketSound } from '../utils/audio';
import { MatchMVPVoting } from './MatchMVPVoting';

export const FanZone: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mvp' | 'prediction' | 'airhorn'>('mvp');
  const [pollVotes, setPollVotes] = useState<{ jb: number; sr: number }>({ jb: 342, sr: 289 });
  const [userVoted, setUserVoted] = useState<'jb' | 'sr' | null>(null);
  const [cheerCount, setCheerCount] = useState<number>(1420);

  const totalVotes = pollVotes.jb + pollVotes.sr;
  const jbPct = Math.round((pollVotes.jb / totalVotes) * 100);
  const srPct = 100 - jbPct;

  const handleVote = (choice: 'jb' | 'sr') => {
    if (userVoted) return;
    setUserVoted(choice);
    setPollVotes((prev) => ({
      ...prev,
      [choice]: prev[choice] + 1
    }));
    cricketSound.playBoundary();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  const handleCheerHorn = () => {
    cricketSound.playHorn();
    setCheerCount((c) => c + 1);
  };

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden mb-6">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-slate-900 via-rose-950/30 to-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-amber-600 text-white flex items-center justify-center shadow-lg shadow-rose-950/40">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-extrabold text-white">
              NPL FAN ZONE &amp; INTERACTIVE ARENA
            </h2>
            <p className="text-[11px] text-slate-400">
              Live Match MVP voting, match predictions &amp; stadium cheers
            </p>
          </div>
        </div>

        {/* FanZone Sub-Tabs */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('mvp')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition ${
              activeTab === 'mvp'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Match MVP</span>
            <span className="text-[9px] font-black uppercase px-1 py-0.2 rounded bg-red-600 text-white">
              Live
            </span>
          </button>

          <button
            onClick={() => setActiveTab('prediction')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition ${
              activeTab === 'prediction'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Match Winner</span>
          </button>

          <button
            onClick={() => setActiveTab('airhorn')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition ${
              activeTab === 'airhorn'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Airhorn</span>
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* SUBTAB 1: MATCH MVP VOTING COMPONENT */}
        {activeTab === 'mvp' && (
          <MatchMVPVoting />
        )}

        {/* SUBTAB 2: WINNER PREDICTION POLL */}
        {activeTab === 'prediction' && (
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Live Fan Prediction: Qualifier 1 Winner
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                {totalVotes} Votes
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Janakpur Bolts Option */}
              <button
                onClick={() => handleVote('jb')}
                className={`p-3 rounded-xl border text-left transition relative overflow-hidden ${
                  userVoted === 'jb'
                    ? 'bg-amber-500/20 border-amber-400 shadow-md shadow-amber-500/20'
                    : 'bg-slate-900 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg p-0.5 bg-slate-950 border border-white/10 shrink-0 flex items-center justify-center">
                      <img
                        src="/assets/teams/janakpur-bolts.png"
                        alt="Janakpur Bolts"
                        className="w-full h-full object-contain filter drop-shadow-sm"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-white text-xs">Janakpur Bolts</h4>
                      <span className="text-[10px] text-slate-400">Aasif Sheikh (c)</span>
                    </div>
                  </div>
                  <span className="font-scoreboard text-2xl font-bold text-amber-400">
                    {jbPct}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-amber-400 transition-all duration-500"
                    style={{ width: `${jbPct}%` }}
                  ></div>
                </div>
              </button>

              {/* Sudurpaschim Royals Option */}
              <button
                onClick={() => handleVote('sr')}
                className={`p-3 rounded-xl border text-left transition relative overflow-hidden ${
                  userVoted === 'sr'
                    ? 'bg-blue-500/20 border-blue-400 shadow-md shadow-blue-500/20'
                    : 'bg-slate-900 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg p-0.5 bg-slate-950 border border-white/10 shrink-0 flex items-center justify-center">
                      <img
                        src="/assets/teams/sudurpaschim-royals.png"
                        alt="Sudurpaschim Royals"
                        className="w-full h-full object-contain filter drop-shadow-sm"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-white text-xs">Sudurpaschim Royals</h4>
                      <span className="text-[10px] text-slate-400">Dipendra S. Airee (c)</span>
                    </div>
                  </div>
                  <span className="font-scoreboard text-2xl font-bold text-blue-400">
                    {srPct}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-500"
                    style={{ width: `${srPct}%` }}
                  ></div>
                </div>
              </button>
            </div>

            {userVoted && (
              <p className="text-center text-xs text-emerald-400 font-medium">
                ✓ Thanks for voting! Your prediction has been recorded.
              </p>
            )}
          </div>
        )}

        {/* SUBTAB 3: STADIUM AIRHORN */}
        {activeTab === 'airhorn' && (
          <div className="p-6 rounded-xl bg-gradient-to-r from-red-950/40 via-slate-950 to-blue-950/40 border border-slate-800 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-3xl mx-auto shadow-lg shadow-amber-500/20">
              🎺
            </div>
            <div>
              <h4 className="font-extrabold text-white text-base">
                Tribhuvan University Ground Stadium Airhorn
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Honk the horn to support the players at Kirtipur! ({cheerCount.toLocaleString()} cheers blown by fans)
              </p>
            </div>

            <button
              onClick={handleCheerHorn}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 hover:from-amber-400 hover:to-red-500 text-slate-950 font-black text-sm inline-flex items-center gap-2 shadow-xl shadow-red-900/50 transition transform active:scale-95"
            >
              <Volume2 className="w-5 h-5" />
              <span>BLOW STADIUM AIRHORN!</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
