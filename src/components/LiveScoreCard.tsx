import React, { useState } from 'react';
import { Flame, Target, Trophy, Clock, ChevronRight, Activity, ArrowRight, Award } from 'lucide-react';
import { Match } from '../types/npl';

interface LiveScoreCardProps {
  match: Match;
  onSimulateBall: (forced?: 'wicket' | 'fifty' | 'century' | 'six' | 'four') => void;
  onResetMatch: () => void;
  onOpenNotificationsModal?: () => void;
}

export const LiveScoreCard: React.FC<LiveScoreCardProps> = ({
  match,
  onSimulateBall,
  onResetMatch,
  onOpenNotificationsModal
}) => {
  const [activeTab, setActiveTab] = useState<'commentary' | 'squads'>('commentary');

  const battingTeam = match.currentBattingTeamId === match.team1.id ? match.team1 : match.team2;
  const bowlingTeam = match.currentBattingTeamId === match.team1.id ? match.team2 : match.team1;

  const currentScore = match.team1Score;
  const opponentScore = match.team2Score;
  const target = currentScore?.target;
  const runsNeeded = target && currentScore ? Math.max(0, target - currentScore.runs) : 0;
  const ballsRemaining = currentScore ? Math.max(0, 120 - (Math.floor(currentScore.overs) * 6 + Math.round((currentScore.overs % 1) * 10))) : 0;

  return (
    <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-2xl overflow-hidden mb-6">
      {/* Top Banner: Stage, Venue, Match Number */}
      <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-800/80 flex items-center justify-between flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 font-semibold uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
            {match.status === 'live' ? 'Match In Progress' : 'Match Finished'}
          </span>
          <span className="text-slate-300 font-medium">{match.stage}</span>
        </div>
        <div className="text-slate-400 flex items-center gap-1 text-[11px]">
          <Clock className="w-3.5 h-3.5 text-slate-500" />
          <span>{match.dateTime}</span>
        </div>
      </div>

      {/* Main Scoreboard Arena */}
      <div className="p-4 sm:p-6 bg-gradient-to-b from-slate-900/60 to-transparent">
        {/* Match Title & Teams */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          {/* Batting Team (Live Score) */}
          <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full" style={{ backgroundColor: battingTeam.primaryColor }}></div>
            
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg border border-white/10"
                style={{ backgroundColor: `${battingTeam.primaryColor}25` }}
              >
                <span>{battingTeam.logoEmoji}</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-white text-base sm:text-lg leading-tight">
                    {battingTeam.name}
                  </h3>
                  <span className="text-xs px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                    BAT
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {target ? `Chasing ${target} runs` : 'Batting 1st'}
                </p>
              </div>
            </div>

            {/* Score Numbers */}
            <div className="text-right">
              <div className="flex items-baseline justify-end gap-1 font-scoreboard text-4xl sm:text-5xl font-bold tracking-tight text-white leading-none">
                <span className="text-amber-400">{currentScore?.runs ?? 0}</span>
                <span className="text-slate-400">/</span>
                <span className="text-white">{currentScore?.wickets ?? 0}</span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                ({currentScore?.overs.toFixed(1)} / 20.0 ov)
              </p>
            </div>
          </div>

          {/* Bowling / Opponent Team */}
          <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-slate-800/40 border border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full" style={{ backgroundColor: bowlingTeam.primaryColor }}></div>
            
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg border border-white/5 opacity-80"
                style={{ backgroundColor: `${bowlingTeam.primaryColor}20` }}
              >
                <span>{bowlingTeam.logoEmoji}</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-slate-200 text-base sm:text-lg leading-tight">
                    {bowlingTeam.name}
                  </h3>
                  <span className="text-xs px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 font-medium border border-blue-500/30">
                    BOWL
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  1st Innings: {opponentScore?.runs}/{opponentScore?.wickets} ({opponentScore?.overs.toFixed(1)} ov)
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="font-scoreboard text-3xl sm:text-4xl font-bold text-slate-300 leading-none">
                {opponentScore?.runs}/{opponentScore?.wickets}
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                (20.0 ov)
              </p>
            </div>
          </div>
        </div>

        {/* Live Equation / Target Status Bar */}
        <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-slate-800/80 via-indigo-950/40 to-slate-800/80 border border-indigo-500/20 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-semibold text-amber-200">
              {match.status === 'completed'
                ? match.resultSummary
                : runsNeeded > 0
                ? `${battingTeam.name} need ${runsNeeded} runs in ${ballsRemaining} balls to win`
                : `${battingTeam.name} Won the match!`}
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300 font-mono text-[11px]">
            <div>
              <span className="text-slate-500 mr-1">CRR:</span>
              <span className="font-bold text-emerald-400">{match.currentRunRate?.toFixed(2) ?? '8.50'}</span>
            </div>
            {match.requiredRunRate !== undefined && match.status === 'live' && (
              <div>
                <span className="text-slate-500 mr-1">RRR:</span>
                <span className="font-bold text-amber-400">{match.requiredRunRate.toFixed(2)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Current Over - Recent Balls Ticker */}
        <div className="mt-4 flex items-center justify-between flex-wrap gap-2 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            This Over:
          </span>

          <div className="flex items-center gap-1.5">
            {match.recentBalls?.map((ball, idx) => {
              let badgeColor = 'bg-slate-800 text-slate-300 border-slate-700';
              if (ball === '6') badgeColor = 'bg-amber-500 text-slate-950 font-black border-amber-300 shadow-md shadow-amber-500/40 scale-110';
              else if (ball === '4') badgeColor = 'bg-blue-600 text-white font-bold border-blue-400 shadow-md shadow-blue-500/30';
              else if (ball === 'W') badgeColor = 'bg-red-600 text-white font-black border-red-400 shadow-md shadow-red-500/40 animate-pulse';
              else if (ball === '•') badgeColor = 'bg-slate-900 text-slate-500 border-slate-800';

              return (
                <span
                  key={idx}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs border transition-all ${badgeColor}`}
                >
                  {ball}
                </span>
              );
            })}
          </div>

          {match.status === 'live' && (
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => onSimulateBall()}
                className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 bg-amber-500/10 hover:bg-amber-500/20 px-2.5 py-1 rounded-lg border border-amber-500/30 transition active:scale-95"
                title="Simulate next cricket ball"
              >
                <span>Bowl Ball</span>
                <ArrowRight className="w-3 h-3" />
              </button>

              <button
                onClick={() => onSimulateBall('wicket')}
                className="text-xs font-bold text-red-300 hover:text-white flex items-center gap-1 bg-red-600/20 hover:bg-red-600/30 px-2.5 py-1 rounded-lg border border-red-500/40 transition active:scale-95 shadow-sm"
                title="Force a wicket to fall and send push notification"
              >
                <span>💥 Trigger Wicket</span>
              </button>

              <button
                onClick={() => onSimulateBall('fifty')}
                className="text-xs font-bold text-amber-200 hover:text-white flex items-center gap-1 bg-amber-500/20 hover:bg-amber-500/30 px-2.5 py-1 rounded-lg border border-amber-500/40 transition active:scale-95 shadow-sm"
                title="Trigger 50 runs milestone and celebratory push notification"
              >
                <span>🏏 Trigger 50</span>
              </button>
            </div>
          )}

          {match.status === 'completed' && (
            <button
              onClick={onResetMatch}
              className="text-xs font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1 bg-emerald-500/10 hover:bg-emerald-500/20 px-2.5 py-1 rounded-lg border border-emerald-500/30 transition"
            >
              <span>Restart Live Demo</span>
            </button>
          )}
        </div>

        {/* Live Push Notification Active Banner */}
        <div className="mt-2.5 px-3 py-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>
              <strong>Push Alerts:</strong> Active for <strong>Wicket Falls</strong> & <strong>50/100 Milestones</strong> in background
            </span>
          </div>
          {onOpenNotificationsModal && (
            <button
              onClick={onOpenNotificationsModal}
              className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2 text-[10px]"
            >
              Configure Alerts
            </button>
          )}
        </div>

        {/* Current In-Crease Batters & Active Bowler */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Batters */}
          <div className="rounded-xl bg-slate-950/40 border border-slate-800/80 p-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
              <span>Batters In Crease</span>
              <span className="font-mono text-slate-500">R (B) 4s 6s SR</span>
            </div>

            <div className="space-y-2">
              {match.batters?.map((batter, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between p-2 rounded-lg text-xs transition ${
                    batter.isStriker
                      ? 'bg-amber-500/10 border border-amber-500/30 text-amber-200'
                      : 'bg-slate-900/50 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-medium">
                    {batter.isStriker && <span className="text-amber-400">🏏</span>}
                    <span className={batter.isStriker ? 'font-bold text-white' : ''}>
                      {batter.name}
                    </span>
                  </div>

                  <div className="font-mono text-right flex items-center gap-3">
                    <span className="font-bold text-amber-300 text-sm">
                      {batter.runs}
                    </span>
                    <span className="text-slate-400 text-[11px]">
                      ({batter.balls})
                    </span>
                    <span className="text-slate-400 text-[11px] w-4 text-center">
                      {batter.fours}
                    </span>
                    <span className="text-slate-400 text-[11px] w-4 text-center">
                      {batter.sixes}
                    </span>
                    <span className="text-emerald-400 text-[11px] font-semibold w-12 text-right">
                      {batter.balls > 0 ? ((batter.runs / batter.balls) * 100).toFixed(1) : '0.0'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bowler */}
          <div className="rounded-xl bg-slate-950/40 border border-slate-800/80 p-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
              <span>Current Bowler</span>
              <span className="font-mono text-slate-500">O M R W ECON</span>
            </div>

            {match.bowler && (
              <div className="flex items-center justify-between p-2 rounded-lg bg-blue-500/10 border border-blue-500/30 text-xs">
                <div className="font-semibold text-white">
                  {match.bowler.name}
                </div>
                <div className="font-mono text-right flex items-center gap-3 text-slate-300">
                  <span className="text-slate-400">{match.bowler.overs.toFixed(1)}</span>
                  <span className="text-slate-500">{match.bowler.maidens}</span>
                  <span className="text-slate-300 font-bold">{match.bowler.runs}</span>
                  <span className="text-red-400 font-black text-sm">{match.bowler.wickets}</span>
                  <span className="text-blue-300 font-semibold">{match.bowler.economy.toFixed(2)}</span>
                </div>
              </div>
            )}

            {/* Win Probability Indicator */}
            {match.winProbability && (
              <div className="mt-3 pt-3 border-t border-slate-800">
                <div className="flex justify-between text-[11px] font-semibold mb-1 text-slate-300">
                  <span className="text-amber-400">{match.team1.shortName}: {match.winProbability.team1}%</span>
                  <span className="text-blue-400">{match.team2.shortName}: {match.winProbability.team2}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden flex">
                  <div
                    className="h-full bg-amber-500 transition-all duration-500"
                    style={{ width: `${match.winProbability.team1}%` }}
                  ></div>
                  <div
                    className="h-full bg-blue-500 transition-all duration-500"
                    style={{ width: `${match.winProbability.team2}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Live Commentary Feed */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              Ball-by-Ball Live Commentary
            </h4>
            <span className="text-[10px] text-slate-500 font-mono">Real-time Nepal Time (NPT)</span>
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {match.commentary?.map((item) => (
              <div
                key={item.id}
                className={`p-2.5 rounded-lg border text-xs transition ${
                  item.isSix
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-100'
                    : item.isFour
                    ? 'bg-blue-500/10 border-blue-500/30 text-blue-100'
                    : item.isWicket
                    ? 'bg-red-500/15 border-red-500/40 text-red-100'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-400 bg-slate-950 px-1.5 py-0.5 rounded text-[11px] border border-slate-800">
                      {item.over}
                    </span>
                    <span className="font-semibold text-white">
                      {item.bowler} to {item.batter}
                    </span>
                  </div>

                  {item.isSix && (
                    <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-black text-[10px] uppercase">
                      SIX (6)
                    </span>
                  )}
                  {item.isFour && (
                    <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-bold text-[10px] uppercase">
                      FOUR (4)
                    </span>
                  )}
                  {item.isWicket && (
                    <span className="px-2 py-0.5 rounded bg-red-600 text-white font-black text-[10px] uppercase animate-pulse">
                      WICKET (W)
                    </span>
                  )}
                </div>

                <p className="text-[12px] leading-relaxed text-slate-200 pl-8">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
