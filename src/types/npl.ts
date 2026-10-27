export interface Team {
  id: string;
  name: string;
  shortName: string;
  city: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  marqueePlayer: string;
  captain: string;
  logoEmoji: string;
  logoUrl: string;
  bannerUrl: string;
  homeVenue: string;
  owner: string;
}

export interface BatterScore {
  name: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  isStriker: boolean;
  dismissal?: string;
  photoUrl?: string;
}

export interface BowlerScore {
  name: string;
  overs: number;
  maidens: number;
  runs: number;
  wickets: number;
  economy: number;
  photoUrl?: string;
}

export interface BallCommentary {
  id: string;
  over: string; // e.g. "18.3"
  runs: number;
  isWicket: boolean;
  isFour: boolean;
  isSix: boolean;
  isExtra?: boolean;
  extraType?: 'wd' | 'nb' | 'b' | 'lb';
  batter: string;
  bowler: string;
  description: string;
  timestamp: string;
}

export interface MatchScore {
  runs: number;
  wickets: number;
  overs: number; // e.g. 18.4
  target?: number;
}

export interface Match {
  id: string;
  matchNumber: number;
  stage: string; // e.g., "League Match 14", "Qualifier 1", "Final"
  venue: string;
  dateTime: string;
  status: 'live' | 'upcoming' | 'completed';
  team1: Team;
  team2: Team;
  tossResult?: string;
  team1Score?: MatchScore;
  team2Score?: MatchScore;
  currentBattingTeamId?: string;
  requiredRunRate?: number;
  currentRunRate?: number;
  batters?: BatterScore[];
  bowler?: BowlerScore;
  recentBalls?: string[]; // e.g. ["1", "4", "•", "6", "W", "2"]
  commentary?: BallCommentary[];
  winProbability?: {
    team1: number;
    team2: number;
  };
  resultSummary?: string;
  manOfTheMatch?: string;
}

export interface StandingsEntry {
  rank: number;
  teamId: string;
  teamName: string;
  teamShortName: string;
  primaryColor: string;
  played: number;
  won: number;
  lost: number;
  tied: number;
  noResult: number;
  netRunRate: number;
  points: number;
  form: ('W' | 'L' | 'NR')[];
  logoEmoji: string;
  logoUrl?: string;
}

export interface PlayerStat {
  id: string;
  name: string;
  teamId: string;
  teamName: string;
  role: 'Batter' | 'Bowler' | 'All-Rounder' | 'Wicketkeeper';
  matches: number;
  runs?: number;
  wickets?: number;
  average?: number;
  strikeRate?: number;
  economy?: number;
  highestScore?: string;
  bestBowling?: string;
  fifties?: number;
  hundreds?: number;
  sixes?: number;
  fours?: number;
  isCapHolder?: boolean;
  photoUrl?: string;
}

export interface PollQuestion {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    votes: number;
    percentage: number;
  }[];
  userVotedId?: string;
}
