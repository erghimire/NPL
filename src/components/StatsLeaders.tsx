import React, { useState } from 'react';
import { Award, Zap, Flame, Shield, Target } from 'lucide-react';
import { TOP_BATSMEN, TOP_BOWLERS } from '../data/nplData';

export const StatsLeaders: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'orange' | 'purple'>('orange');

  const orangeLeader = TOP_BATSMEN[0];
  const purpleLeader = TOP_BOWLERS[0];

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden mb-6">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-slate-900 via-amber-950/20 to-slate-900 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-extrabold text-white">
              NPL TOURNAMENT STATS & CAPS
            </h2>
            <p className="text-[11px] text-slate-400">
              Leading performers of the Nepal Premier League
            </p>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('orange')}
            className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 transition ${
              activeTab === 'orange'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🧢 Orange Cap (Runs)</span>
          </button>
          <button
            onClick={() => setActiveTab('purple')}
            className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 transition ${
              activeTab === 'purple'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🧢 Purple Cap (Wkts)</span>
          </button>
        </div>
      </div>

      <div className="p-4">
        {/* Spotlight Card */}
        {activeTab === 'orange' ? (
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/15 via-slate-900 to-amber-900/15 border border-amber-500/30 mb-4 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-lg shadow-amber-500/20 shrink-0 relative bg-slate-900">
                {orangeLeader.photoUrl ? (
                  <img
                    src={orangeLeader.photoUrl}
                    alt={orangeLeader.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : null}
                <span className="absolute bottom-1 right-1 text-xs drop-shadow">🧢</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-black tracking-widest text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30 inline-block mb-1">
                  CURRENT ORANGE CAP HOLDER
                </span>
                <h3 className="font-extrabold text-white text-base sm:text-lg">
                  {orangeLeader.name}
                </h3>
                <p className="text-xs text-amber-200/80 font-medium">
                  {orangeLeader.teamName} • {orangeLeader.matches} Matches
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-center">
              <div>
                <span className="text-[10px] uppercase text-slate-400 font-bold block">Runs</span>
                <span className="font-scoreboard text-3xl sm:text-4xl font-black text-amber-400">
                  {orangeLeader.runs}
                </span>
              </div>
              <div className="h-8 w-px bg-slate-700"></div>
              <div>
                <span className="text-[10px] uppercase text-slate-400 font-bold block">Strike Rate</span>
                <span className="font-mono text-base font-bold text-white">
                  {orangeLeader.strikeRate}
                </span>
              </div>
              <div className="h-8 w-px bg-slate-700"></div>
              <div>
                <span className="text-[10px] uppercase text-slate-400 font-bold block">Sixes</span>
                <span className="font-mono text-base font-bold text-emerald-400">
                  {orangeLeader.sixes}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/15 via-slate-900 to-purple-900/15 border border-purple-500/30 mb-4 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-purple-400 shadow-lg shadow-purple-500/20 shrink-0 relative bg-slate-900">
                {purpleLeader.photoUrl ? (
                  <img
                    src={purpleLeader.photoUrl}
                    alt={purpleLeader.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : null}
                <span className="absolute bottom-1 right-1 text-xs drop-shadow">🧢</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-black tracking-widest text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded border border-purple-500/30 inline-block mb-1">
                  CURRENT PURPLE CAP HOLDER
                </span>
                <h3 className="font-extrabold text-white text-base sm:text-lg">
                  {purpleLeader.name}
                </h3>
                <p className="text-xs text-purple-200/80 font-medium">
                  {purpleLeader.teamName} • {purpleLeader.matches} Matches
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-center">
              <div>
                <span className="text-[10px] uppercase text-slate-400 font-bold block">Wickets</span>
                <span className="font-scoreboard text-3xl sm:text-4xl font-black text-purple-400">
                  {purpleLeader.wickets}
                </span>
              </div>
              <div className="h-8 w-px bg-slate-700"></div>
              <div>
                <span className="text-[10px] uppercase text-slate-400 font-bold block">Economy</span>
                <span className="font-mono text-base font-bold text-white">
                  {purpleLeader.economy}
                </span>
              </div>
              <div className="h-8 w-px bg-slate-700"></div>
              <div>
                <span className="text-[10px] uppercase text-slate-400 font-bold block">Best</span>
                <span className="font-mono text-base font-bold text-emerald-400">
                  {purpleLeader.bestBowling}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard Table */}
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="bg-slate-950/80 text-slate-400 font-bold uppercase text-[10px] border-b border-slate-800">
                <th className="py-2.5 px-3 text-center">Rank</th>
                <th className="py-2.5 px-3">Player</th>
                <th className="py-2.5 px-3">Team</th>
                <th className="py-2.5 px-2 text-center">Mat</th>
                {activeTab === 'orange' ? (
                  <>
                    <th className="py-2.5 px-3 text-right font-extrabold text-amber-400">Runs</th>
                    <th className="py-2.5 px-3 text-right">Avg</th>
                    <th className="py-2.5 px-3 text-right">SR</th>
                    <th className="py-2.5 px-2 text-center">4s</th>
                    <th className="py-2.5 px-2 text-center">6s</th>
                    <th className="py-2.5 px-3 text-right">HS</th>
                  </>
                ) : (
                  <>
                    <th className="py-2.5 px-3 text-right font-extrabold text-purple-400">Wkts</th>
                    <th className="py-2.5 px-3 text-right">Avg</th>
                    <th className="py-2.5 px-3 text-right">Econ</th>
                    <th className="py-2.5 px-3 text-right">Best</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {(activeTab === 'orange' ? TOP_BATSMEN : TOP_BOWLERS).map((player, idx) => (
                <tr key={player.id} className="hover:bg-slate-800/30 transition">
                  <td className="py-2.5 px-3 text-center font-bold text-slate-400">
                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : idx + 1}
                  </td>
                  <td className="py-2.5 px-3 font-bold text-white">
                    <div className="flex items-center gap-2">
                      {player.photoUrl ? (
                        <img
                          src={player.photoUrl}
                          alt={player.name}
                          className="w-6 h-6 rounded-full object-cover border border-slate-700 shrink-0 shadow-sm"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] text-slate-300 font-bold border border-slate-700 shrink-0">
                          {player.name.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <span className="flex items-center gap-1">
                        {player.name}
                        {player.isCapHolder && (
                          <span className="text-[10px]">🧢</span>
                        )}
                      </span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">
                    {player.teamName}
                  </td>
                  <td className="py-2.5 px-2 text-center font-mono text-slate-400">
                    {player.matches}
                  </td>
                  {activeTab === 'orange' ? (
                    <>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-amber-400 text-sm">
                        {player.runs}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-slate-300">
                        {player.average}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-emerald-400">
                        {player.strikeRate}
                      </td>
                      <td className="py-2.5 px-2 text-center font-mono text-slate-400">
                        {player.fours}
                      </td>
                      <td className="py-2.5 px-2 text-center font-mono text-amber-300 font-bold">
                        {player.sixes}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-slate-300">
                        {player.highestScore}
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-purple-400 text-sm">
                        {player.wickets}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-slate-300">
                        {player.average}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-emerald-400">
                        {player.economy}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-amber-300 font-bold">
                        {player.bestBowling}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
