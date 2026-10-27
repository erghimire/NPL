import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Award, Shield, ChevronRight } from 'lucide-react';
import { Match } from '../types/npl';

interface FixturesProps {
  matches: Match[];
  onSelectMatch?: (match: Match) => void;
}

export const Fixtures: React.FC<FixturesProps> = ({ matches, onSelectMatch }) => {
  const [filter, setFilter] = useState<'all' | 'live' | 'upcoming' | 'completed'>('all');

  const filteredMatches = matches.filter((m) => {
    if (filter === 'all') return true;
    return m.status === filter;
  });

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden mb-6">
      {/* Header & Tabs */}
      <div className="p-4 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-extrabold text-white">
                NPL 2026 FIXTURES &amp; RESULTS
              </h2>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                LIVE 2026 SEASON
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Official schedule &amp; match results from <strong>Wikipedia &amp; ESPNcricinfo</strong>
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          {(['all', 'live', 'upcoming', 'completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1 rounded-lg font-semibold uppercase text-[10px] tracking-wider transition ${
                filter === tab
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {tab === 'live' ? '🔴 Live' : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Match Cards List */}
      <div className="p-3 sm:p-4 space-y-3">
        {filteredMatches.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">
            No matches found for this filter.
          </div>
        ) : (
          filteredMatches.map((match) => {
            const isLive = match.status === 'live';
            const isCompleted = match.status === 'completed';

            return (
              <div
                key={match.id}
                onClick={() => onSelectMatch?.(match)}
                className={`p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer ${
                  isLive
                    ? 'bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border-red-500/40 shadow-lg shadow-red-950/20 hover:border-red-400'
                    : 'bg-slate-950/60 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
                }`}
              >
                {/* Top Line: Stage & Status */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-300">
                      Match {match.matchNumber}: {match.stage}
                    </span>
                    {isLive && (
                      <span className="px-1.5 py-0.5 rounded bg-red-600 text-white font-extrabold text-[9px] uppercase tracking-wider animate-pulse">
                        LIVE NOW
                      </span>
                    )}
                    {isCompleted && (
                      <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold text-[9px] uppercase">
                        COMPLETED
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 font-mono text-[10px]">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{match.dateTime}</span>
                  </div>
                </div>

                {/* Teams Lineup */}
                <div className="space-y-2 my-2">
                  {/* Team 1 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded flex items-center justify-center p-0.5 bg-slate-900 border border-white/10 shrink-0">
                        {match.team1.logoUrl ? (
                          <img
                            src={match.team1.logoUrl}
                            alt={match.team1.name}
                            className="w-full h-full object-contain filter drop-shadow-sm"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              if (e.currentTarget.nextElementSibling) {
                                (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'block';
                              }
                            }}
                          />
                        ) : null}
                        <span className={match.team1.logoUrl ? 'hidden text-xs' : 'text-xs'}>{match.team1.logoEmoji}</span>
                      </div>
                      <span className="font-bold text-white text-xs sm:text-sm">
                        {match.team1.name}
                      </span>
                    </div>
                    {match.team1Score && (
                      <div className="font-scoreboard text-lg sm:text-xl font-bold text-white tracking-wide">
                        {match.team1Score.runs}/{match.team1Score.wickets}
                        <span className="text-xs text-slate-400 font-normal ml-1">
                          ({match.team1Score.overs.toFixed(1)})
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Team 2 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded flex items-center justify-center p-0.5 bg-slate-900 border border-white/10 shrink-0">
                        {match.team2.logoUrl ? (
                          <img
                            src={match.team2.logoUrl}
                            alt={match.team2.name}
                            className="w-full h-full object-contain filter drop-shadow-sm"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              if (e.currentTarget.nextElementSibling) {
                                (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'block';
                              }
                            }}
                          />
                        ) : null}
                        <span className={match.team2.logoUrl ? 'hidden text-xs' : 'text-xs'}>{match.team2.logoEmoji}</span>
                      </div>
                      <span className="font-bold text-white text-xs sm:text-sm">
                        {match.team2.name}
                      </span>
                    </div>
                    {match.team2Score && (
                      <div className="font-scoreboard text-lg sm:text-xl font-bold text-white tracking-wide">
                        {match.team2Score.runs}/{match.team2Score.wickets}
                        <span className="text-xs text-slate-400 font-normal ml-1">
                          ({match.team2Score.overs.toFixed(1)})
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom line: Result or Toss */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between flex-wrap gap-2 text-[11px]">
                  <div className="text-amber-300 font-medium">
                    {match.resultSummary || match.tossResult || 'Match scheduled at Tribhuvan Ground'}
                  </div>

                  {match.manOfTheMatch && (
                    <div className="flex items-center gap-1 text-slate-400 text-[10px]">
                      <Award className="w-3 h-3 text-amber-400" />
                      <span>PotM: {match.manOfTheMatch}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-1 text-slate-500 text-[10px]">
                    <MapPin className="w-3 h-3" />
                    <span>TU Ground, Kirtipur</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
