import React, { useState, useEffect } from 'react';
import { Award, Star, Trophy, Sparkles, CheckCircle2, TrendingUp, Users, ChevronRight, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cricketSound } from '../utils/audio';

export interface MVPCandidate {
  id: string;
  name: string;
  teamId: string;
  teamName: string;
  teamShort: string;
  teamColor: string;
  teamEmoji: string;
  role: string;
  matchPerformance: string;
  highlightPill: string;
  votes: number;
}

const INITIAL_CANDIDATES: MVPCandidate[] = [
  {
    id: 'mvp-1',
    name: 'James Neesham',
    teamId: 'janakpur_bolts',
    teamName: 'Janakpur Bolts',
    teamShort: 'JB',
    teamColor: '#EAB308',
    teamEmoji: '⚡',
    role: 'All-Rounder',
    matchPerformance: '54* (28) • 4x4, 4x6 • SR: 192.8 & 1/18 (2.0 ov)',
    highlightPill: 'Blistering 54* & Wicket',
    votes: 842
  },
  {
    id: 'mvp-2',
    name: 'Aasif Sheikh',
    teamId: 'janakpur_bolts',
    teamName: 'Janakpur Bolts',
    teamShort: 'JB',
    teamColor: '#EAB308',
    teamEmoji: '⚡',
    role: 'Captain & Wicketkeeper',
    matchPerformance: '62 (41) • 6x4, 2x6 • Anchor Chase',
    highlightPill: 'Top Scorer (62 Runs)',
    votes: 715
  },
  {
    id: 'mvp-3',
    name: 'Dipendra Singh Airee',
    teamId: 'sudurpaschim_royals',
    teamName: 'Sudurpaschim Royals',
    teamShort: 'SR',
    teamColor: '#2563EB',
    teamEmoji: '👑',
    role: 'Captain & All-Rounder',
    matchPerformance: '58 (32) • 4x4, 3x6 & 1/24 (4.0 ov)',
    highlightPill: 'Captain Knock 58 & 1 Wkt',
    votes: 688
  },
  {
    id: 'mvp-4',
    name: 'Scott Kuggeleijn',
    teamId: 'sudurpaschim_royals',
    teamName: 'Sudurpaschim Royals',
    teamShort: 'SR',
    teamColor: '#2563EB',
    teamEmoji: '👑',
    role: 'Fast Bowler',
    matchPerformance: '2/31 (3.2 ov) • Econ: 9.3 • 18 (9)',
    highlightPill: '2 Crucial Wickets',
    votes: 320
  },
  {
    id: 'mvp-5',
    name: 'Kishore Mahato',
    teamId: 'janakpur_bolts',
    teamName: 'Janakpur Bolts',
    teamShort: 'JB',
    teamColor: '#EAB308',
    teamEmoji: '⚡',
    role: 'Fast Bowler',
    matchPerformance: '3/26 (4.0 ov) • Econ: 6.50',
    highlightPill: '3/26 in 1st Innings',
    votes: 295
  }
];

const RECENT_VOTERS = [
  { user: 'Bipin from Pokhara', candidate: 'James Neesham', time: 'Just now' },
  { user: 'Aayush from Kathmandu', candidate: 'Aasif Sheikh', time: '4s ago' },
  { user: 'Suman from Dhangadhi', candidate: 'Dipendra Singh Airee', time: '9s ago' },
  { user: 'Pooja from Butwal', candidate: 'James Neesham', time: '14s ago' },
  { user: 'Roshan from Janakpur', candidate: 'Aasif Sheikh', time: '18s ago' },
  { user: 'Kiran from Biratnagar', candidate: 'Scott Kuggeleijn', time: '23s ago' }
];

export const MatchMVPVoting: React.FC = () => {
  const [candidates, setCandidates] = useState<MVPCandidate[]>(INITIAL_CANDIDATES);
  const [userVotedId, setUserVotedId] = useState<string | null>(null);
  const [teamFilter, setTeamFilter] = useState<'all' | 'janakpur_bolts' | 'sudurpaschim_royals'>('all');
  const [recentVotes, setRecentVotes] = useState(RECENT_VOTERS);
  const [pulseCandidateId, setPulseCandidateId] = useState<string | null>(null);

  // Total votes calculation
  const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);

  // Find leader
  const sortedCandidates = [...candidates].sort((a, b) => b.votes - a.votes);
  const leaderId = sortedCandidates[0]?.id;

  // Real-time live vote increments (simulating stadium audience participation)
  useEffect(() => {
    const timer = setInterval(() => {
      // Pick random candidate to gain 1 or 2 live votes
      const randIdx = Math.floor(Math.random() * candidates.length);
      const chosen = candidates[randIdx];

      setCandidates((prev) =>
        prev.map((c, idx) => (idx === randIdx ? { ...c, votes: c.votes + 1 } : c))
      );

      setPulseCandidateId(chosen.id);
      setTimeout(() => setPulseCandidateId(null), 1500);

      // Add to live voter ticker
      const randomCities = ['Kathmandu', 'Pokhara', 'Dhangadhi', 'Biratnagar', 'Janakpur', 'Chitwan', 'Butwal', 'Nepalgunj', 'Surkhet'];
      const randomNames = ['Prabin', 'Aashish', 'Sandesh', 'Anjali', 'Saroj', 'Dinesh', 'Manisha', 'Bikash', 'Kabita', 'Santosh'];
      const newVoter = {
        user: `${randomNames[Math.floor(Math.random() * randomNames.length)]} from ${randomCities[Math.floor(Math.random() * randomCities.length)]}`,
        candidate: chosen.name,
        time: 'Just now'
      };

      setRecentVotes((prev) => [newVoter, ...prev.slice(0, 4)]);
    }, 4500);

    return () => clearInterval(timer);
  }, [candidates.length]);

  const handleVote = (candidateId: string) => {
    if (userVotedId === candidateId) return;

    setUserVotedId(candidateId);
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, votes: c.votes + 1 } : c))
    );

    cricketSound.playBoundary();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.75 }
    });
  };

  const filteredCandidates = candidates.filter((c) => {
    if (teamFilter === 'all') return true;
    return c.teamId === teamFilter;
  });

  return (
    <div className="p-4 sm:p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
      {/* MVP Component Title Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 font-black">
            <Trophy className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-white text-sm sm:text-base tracking-tight">
                LIVE MATCH MVP VOTING
              </h3>
              <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
                LIVE
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Vote for the best player of Qualifier 1 • Real-time stadium fan tally
            </p>
          </div>
        </div>

        {/* Total Votes Counter */}
        <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-xs">
          <Users className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-slate-400">Total Votes:</span>
          <span className="font-scoreboard text-base font-bold text-amber-400 tracking-wide">
            {totalVotes.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-[11px]">
          <button
            onClick={() => setTeamFilter('all')}
            className={`px-3 py-1 rounded-lg font-bold transition ${
              teamFilter === 'all'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Candidates
          </button>
          <button
            onClick={() => setTeamFilter('janakpur_bolts')}
            className={`px-3 py-1 rounded-lg font-bold transition flex items-center gap-1 ${
              teamFilter === 'janakpur_bolts'
                ? 'bg-yellow-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>⚡ Janakpur Bolts</span>
          </button>
          <button
            onClick={() => setTeamFilter('sudurpaschim_royals')}
            className={`px-3 py-1 rounded-lg font-bold transition flex items-center gap-1 ${
              teamFilter === 'sudurpaschim_royals'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>👑 Sudurpaschim Royals</span>
          </button>
        </div>

        <div className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
          <TrendingUp className="w-3 h-3 text-emerald-400" />
          <span>Updates every 4s</span>
        </div>
      </div>

      {/* Candidates List */}
      <div className="space-y-3">
        {filteredCandidates.map((candidate) => {
          const isVoted = userVotedId === candidate.id;
          const isLeader = candidate.id === leaderId;
          const isPulsing = pulseCandidateId === candidate.id;
          const percentage = totalVotes > 0 ? Math.round((candidate.votes / totalVotes) * 100) : 0;

          return (
            <div
              key={candidate.id}
              className={`p-3.5 rounded-xl border transition-all duration-300 relative overflow-hidden ${
                isVoted
                  ? 'bg-gradient-to-r from-amber-950/30 via-slate-900 to-amber-950/20 border-amber-400/80 shadow-lg shadow-amber-500/10'
                  : isLeader
                  ? 'bg-slate-900/90 border-amber-500/50'
                  : 'bg-slate-900/60 border-slate-800 hover:bg-slate-900 hover:border-slate-700'
              }`}
            >
              {/* Highlight bar on left matching franchise color */}
              <div
                className="absolute top-0 left-0 w-1.5 h-full"
                style={{ backgroundColor: candidate.teamColor }}
              ></div>

              <div className="flex items-start justify-between gap-3 pl-2">
                {/* Left: Player Identity and Match Performance */}
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 shadow border border-white/10 mt-0.5"
                    style={{ backgroundColor: `${candidate.teamColor}25` }}
                  >
                    <span>{candidate.teamEmoji}</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-extrabold text-white text-sm">
                        {candidate.name}
                      </h4>

                      {isLeader && (
                        <span className="flex items-center gap-1 px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold uppercase tracking-wider">
                          <span>👑</span>
                          <span>MVP Leader</span>
                        </span>
                      )}

                      {isVoted && (
                        <span className="flex items-center gap-1 px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Your Vote</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                      <span>{candidate.teamName}</span>
                      <span>•</span>
                      <span className="text-slate-300 font-medium">{candidate.role}</span>
                    </div>

                    {/* Live Match Performance Stats Pill */}
                    <p className="text-[11px] text-slate-200 bg-slate-950/70 px-2 py-1 rounded-md border border-slate-800/80 mt-1.5 font-mono">
                      <span className="text-amber-400 font-bold mr-1">Match:</span>
                      {candidate.matchPerformance}
                    </p>
                  </div>
                </div>

                {/* Right: Vote percentage, count and Vote Button */}
                <div className="text-right shrink-0">
                  <div className="flex items-baseline justify-end gap-1 font-scoreboard text-2xl sm:text-3xl font-bold leading-none">
                    <span className={isLeader ? 'text-amber-400' : 'text-white'}>
                      {percentage}%
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-mono transition-colors block ${
                      isPulsing ? 'text-emerald-400 font-bold scale-105' : 'text-slate-400'
                    }`}
                  >
                    {candidate.votes.toLocaleString()} votes
                  </span>

                  <button
                    onClick={() => handleVote(candidate.id)}
                    className={`mt-2 px-3 py-1 rounded-lg text-xs font-bold transition transform active:scale-90 flex items-center gap-1 ml-auto ${
                      isVoted
                        ? 'bg-emerald-600 text-white cursor-default shadow-md'
                        : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-900/30'
                    }`}
                  >
                    {isVoted ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Voted</span>
                      </>
                    ) : (
                      <>
                        <Star className="w-3.5 h-3.5 fill-slate-950" />
                        <span>Vote MVP</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Vote Percentage Progress Bar */}
              <div className="w-full h-1.5 rounded-full bg-slate-800/80 overflow-hidden mt-3 pl-2">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: isLeader ? '#F59E0B' : candidate.teamColor
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Fan Voting Activity Ticker */}
      <div className="pt-2 border-t border-slate-800/80">
        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
          <span className="font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            Live Fan MVP Voting Stream
          </span>
          <span className="text-[10px] text-slate-500 font-mono">TU Stadium & Worldwide</span>
        </div>

        <div className="space-y-1.5">
          {recentVotes.slice(0, 3).map((vote, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2 rounded-lg bg-slate-900/40 border border-slate-800/60 text-xs transition"
            >
              <div className="flex items-center gap-2 text-slate-300">
                <span className="text-amber-400 text-[10px]">⭐</span>
                <span className="font-medium text-white">{vote.user}</span>
                <span className="text-slate-500">voted for</span>
                <span className="font-bold text-amber-300">{vote.candidate}</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">{vote.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
