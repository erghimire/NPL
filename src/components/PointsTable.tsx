import React from 'react';
import { Trophy, Shield, ArrowUpRight, TrendingUp, Info } from 'lucide-react';
import { StandingsEntry } from '../types/npl';

interface PointsTableProps {
  standings: StandingsEntry[];
  onSelectTeam?: (teamId: string) => void;
}

export const PointsTable: React.FC<PointsTableProps> = ({ standings, onSelectTeam }) => {
  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden mb-6">
      {/* Header banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/50 to-slate-900 px-4 py-3.5 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-extrabold text-white tracking-wide">
              NPL POINTS TABLE STANDINGS
            </h2>
            <p className="text-[11px] text-slate-400">
              Live standings automatically updated with Net Run Rate (NRR)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px]">
          <span className="flex items-center gap-1 bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/20 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Qualifier 1 (Top 2)
          </span>
          <span className="flex items-center gap-1 bg-blue-500/10 text-blue-300 px-2 py-0.5 rounded border border-blue-500/20 font-medium">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            Eliminator (3 & 4)
          </span>
        </div>
      </div>

      {/* Table container */}
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead>
            <tr className="bg-slate-950/80 text-slate-400 font-bold uppercase tracking-wider text-[11px] border-b border-slate-800">
              <th className="py-3 px-3 text-center w-10">Pos</th>
              <th className="py-3 px-4">Team</th>
              <th className="py-3 px-2 text-center">P</th>
              <th className="py-3 px-2 text-center">W</th>
              <th className="py-3 px-2 text-center">L</th>
              <th className="py-3 px-2 text-center">NR</th>
              <th className="py-3 px-3 text-right">NRR</th>
              <th className="py-3 px-3 text-center font-extrabold text-amber-400">PTS</th>
              <th className="py-3 px-3 text-center">Form (Last 5)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-medium">
            {standings.map((team, idx) => {
              const isQualifier1 = idx < 2;
              const isEliminator = idx >= 2 && idx < 4;

              return (
                <tr
                  key={team.teamId}
                  onClick={() => onSelectTeam?.(team.teamId)}
                  className={`hover:bg-slate-800/40 transition-colors cursor-pointer ${
                    isQualifier1 ? 'bg-emerald-950/10' : isEliminator ? 'bg-blue-950/10' : ''
                  }`}
                >
                  {/* Position */}
                  <td className="py-3 px-3 text-center">
                    <div className="flex items-center justify-center">
                      <span
                        className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs ${
                          isQualifier1
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : isEliminator
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : 'text-slate-400'
                        }`}
                      >
                        {idx + 1}
                      </span>
                    </div>
                  </td>

                  {/* Team Name and Icon */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-sm shadow border border-white/10"
                        style={{ backgroundColor: `${team.primaryColor}25` }}
                      >
                        {team.logoEmoji}
                      </div>
                      <div>
                        <div className="font-extrabold text-white text-xs sm:text-sm flex items-center gap-1.5">
                          {team.teamName}
                          {isQualifier1 && (
                            <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider px-1 rounded bg-emerald-500/20 border border-emerald-500/30">
                              Q1
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {team.teamShortName}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Matches Played */}
                  <td className="py-3 px-2 text-center text-slate-300 font-mono">
                    {team.played}
                  </td>

                  {/* Won */}
                  <td className="py-3 px-2 text-center text-emerald-400 font-bold font-mono">
                    {team.won}
                  </td>

                  {/* Lost */}
                  <td className="py-3 px-2 text-center text-red-400 font-mono">
                    {team.lost}
                  </td>

                  {/* No Result */}
                  <td className="py-3 px-2 text-center text-slate-400 font-mono">
                    {team.noResult}
                  </td>

                  {/* Net Run Rate */}
                  <td className="py-3 px-3 text-right font-mono font-semibold">
                    <span
                      className={
                        team.netRunRate > 0
                          ? 'text-emerald-400'
                          : team.netRunRate < 0
                          ? 'text-red-400'
                          : 'text-slate-400'
                      }
                    >
                      {team.netRunRate > 0 ? `+${team.netRunRate.toFixed(3)}` : team.netRunRate.toFixed(3)}
                    </span>
                  </td>

                  {/* Points */}
                  <td className="py-3 px-3 text-center">
                    <span className="font-scoreboard text-xl sm:text-2xl font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                      {team.points}
                    </span>
                  </td>

                  {/* Form */}
                  <td className="py-3 px-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      {team.form.map((res, fIdx) => (
                        <span
                          key={fIdx}
                          className={`w-4 h-4 rounded text-[9px] font-bold flex items-center justify-center ${
                            res === 'W'
                              ? 'bg-emerald-600 text-white'
                              : res === 'L'
                              ? 'bg-red-600/80 text-white'
                              : 'bg-slate-700 text-slate-300'
                          }`}
                        >
                          {res}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Rules & Playoff Progression Guide */}
      <div className="p-3 bg-slate-950/70 border-t border-slate-800 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span>
            <strong>NPL Playoff Rules:</strong> Top 2 teams play <strong>Qualifier 1</strong> (winner to Final). 3rd vs 4th in <strong>Eliminator</strong>. Winner plays Q1 loser in <strong>Qualifier 2</strong>.
          </span>
        </div>
        <div className="text-slate-500">
          2 Pts for Win • 1 Pt for Tied/NR • Sorted by Points then NRR
        </div>
      </div>
    </div>
  );
};
