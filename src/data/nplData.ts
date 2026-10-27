import { Team, StandingsEntry, PlayerStat, Match } from '../types/npl';

export const NPL_TEAMS: Record<string, Team> = {
  janakpur_bolts: {
    id: 'janakpur_bolts',
    name: 'Janakpur Bolts',
    shortName: 'JB',
    city: 'Janakpurdham',
    primaryColor: '#EAB308', // Bolt Gold
    secondaryColor: '#1E3A8A', // Royal Navy
    accentColor: '#FACC15',
    marqueePlayer: 'James Neesham',
    captain: 'Aasif Sheikh',
    logoEmoji: '⚡',
    homeVenue: 'Ram Janaki Stadium / TU Ground',
    owner: 'Dream Sports Nepal'
  },
  sudurpaschim_royals: {
    id: 'sudurpaschim_royals',
    name: 'Sudurpaschim Royals',
    shortName: 'SR',
    city: 'Dhangadhi',
    primaryColor: '#2563EB', // Royal Blue
    secondaryColor: '#D97706', // Gold/Amber
    accentColor: '#60A5FA',
    marqueePlayer: 'Dipendra Singh Airee',
    captain: 'Dipendra Singh Airee',
    logoEmoji: '👑',
    homeVenue: 'Fapla Cricket Ground / TU Ground',
    owner: 'Empire Sports'
  },
  biratnagar_kings: {
    id: 'biratnagar_kings',
    name: 'Biratnagar Kings',
    shortName: 'BK',
    city: 'Biratnagar',
    primaryColor: '#DC2626', // Crimson Red
    secondaryColor: '#1E293B', // Charcoal
    accentColor: '#F87171',
    marqueePlayer: 'Martin Guptill',
    captain: 'Sandeep Lamichhane',
    logoEmoji: '🦁',
    homeVenue: 'Biratnagar Stadium / TU Ground',
    owner: 'MAD Dream Group'
  },
  kathmandu_gurkhas: {
    id: 'kathmandu_gurkhas',
    name: 'Kathmandu Gurkhas',
    shortName: 'KG',
    city: 'Kathmandu',
    primaryColor: '#059669', // Emerald / Khukuri Green
    secondaryColor: '#B45309', // Gurkha Gold
    accentColor: '#34D399',
    marqueePlayer: 'Gerhard Erasmus',
    captain: 'Karan KC',
    logoEmoji: '⚔️',
    homeVenue: 'Mulpani International Cricket Stadium',
    owner: 'Kathmandu Sports Pvt. Ltd.'
  },
  pokhara_avengers: {
    id: 'pokhara_avengers',
    name: 'Pokhara Avengers',
    shortName: 'PA',
    city: 'Pokhara',
    primaryColor: '#06B6D4', // Annapurna Cyan
    secondaryColor: '#0F172A', // Midnight Slate
    accentColor: '#22D3EE',
    marqueePlayer: 'Matt Critchley',
    captain: 'Kushal Bhurtel',
    logoEmoji: '🦅',
    homeVenue: 'Pokhara Rangasala Cricket Ground',
    owner: 'Nepal T20 Ventures'
  },
  chitwan_rhinos: {
    id: 'chitwan_rhinos',
    name: 'Chitwan Rhinos',
    shortName: 'CR',
    city: 'Bharatpur',
    primaryColor: '#0D9488', // Teal Rhino
    secondaryColor: '#EA580C', // Rhino Orange
    accentColor: '#2DD4BF',
    marqueePlayer: 'Marchant de Lange',
    captain: 'Kushal Malla',
    logoEmoji: '🦏',
    homeVenue: 'Gautam Buddha International Stadium',
    owner: 'Chitwan Sports Academy'
  },
  karnali_yaks: {
    id: 'karnali_yaks',
    name: 'Karnali Yaks',
    shortName: 'KY',
    city: 'Surkhet',
    primaryColor: '#9333EA', // Himalayan Purple
    secondaryColor: '#DC2626', // Flame Red
    accentColor: '#C084FC',
    marqueePlayer: 'Shikhar Dhawan',
    captain: 'Sompal Kami',
    logoEmoji: '🐂',
    homeVenue: 'Surkhet Stadium / TU Ground',
    owner: 'Himalayan Cricket Trust'
  },
  lumbini_lions: {
    id: 'lumbini_lions',
    name: 'Lumbini Lions',
    shortName: 'LL',
    city: 'Butwal / Lumbini',
    primaryColor: '#B91C1C', // Buddhist Maroon
    secondaryColor: '#F59E0B', // Saffron Gold
    accentColor: '#EF4444',
    marqueePlayer: 'Ben Cutting',
    captain: 'Rohit Paudel',
    logoEmoji: '🐅',
    homeVenue: 'Extra Tech Oval, Tilottama',
    owner: 'Fortuna Sports'
  }
};

export const INITIAL_STANDINGS: StandingsEntry[] = [
  {
    rank: 1,
    teamId: 'janakpur_bolts',
    teamName: 'Janakpur Bolts',
    teamShortName: 'JB',
    primaryColor: '#EAB308',
    played: 7,
    won: 6,
    lost: 1,
    tied: 0,
    noResult: 0,
    netRunRate: 1.285,
    points: 12,
    form: ['W', 'W', 'L', 'W', 'W'],
    logoEmoji: '⚡'
  },
  {
    rank: 2,
    teamId: 'sudurpaschim_royals',
    teamName: 'Sudurpaschim Royals',
    teamShortName: 'SR',
    primaryColor: '#2563EB',
    played: 7,
    won: 5,
    lost: 2,
    tied: 0,
    noResult: 0,
    netRunRate: 0.842,
    points: 10,
    form: ['W', 'L', 'W', 'W', 'W'],
    logoEmoji: '👑'
  },
  {
    rank: 3,
    teamId: 'biratnagar_kings',
    teamName: 'Biratnagar Kings',
    teamShortName: 'BK',
    primaryColor: '#DC2626',
    played: 7,
    won: 4,
    lost: 3,
    tied: 0,
    noResult: 0,
    netRunRate: 0.312,
    points: 8,
    form: ['W', 'W', 'L', 'W', 'L'],
    logoEmoji: '🦁'
  },
  {
    rank: 4,
    teamId: 'kathmandu_gurkhas',
    teamName: 'Kathmandu Gurkhas',
    teamShortName: 'KG',
    primaryColor: '#059669',
    played: 7,
    won: 4,
    lost: 3,
    tied: 0,
    noResult: 0,
    netRunRate: 0.118,
    points: 8,
    form: ['L', 'W', 'W', 'L', 'W'],
    logoEmoji: '⚔️'
  },
  {
    rank: 5,
    teamId: 'chitwan_rhinos',
    teamName: 'Chitwan Rhinos',
    teamShortName: 'CR',
    primaryColor: '#0D9488',
    played: 7,
    won: 3,
    lost: 4,
    tied: 0,
    noResult: 0,
    netRunRate: -0.194,
    points: 6,
    form: ['L', 'L', 'W', 'W', 'L'],
    logoEmoji: '🦏'
  },
  {
    rank: 6,
    teamId: 'pokhara_avengers',
    teamName: 'Pokhara Avengers',
    teamShortName: 'PA',
    primaryColor: '#06B6D4',
    played: 7,
    won: 3,
    lost: 4,
    tied: 0,
    noResult: 0,
    netRunRate: -0.428,
    points: 6,
    form: ['W', 'L', 'L', 'L', 'W'],
    logoEmoji: '🦅'
  },
  {
    rank: 7,
    teamId: 'karnali_yaks',
    teamName: 'Karnali Yaks',
    teamShortName: 'KY',
    primaryColor: '#9333EA',
    played: 7,
    won: 2,
    lost: 5,
    tied: 0,
    noResult: 0,
    netRunRate: -0.875,
    points: 4,
    form: ['L', 'L', 'W', 'L', 'L'],
    logoEmoji: '🐂'
  },
  {
    rank: 8,
    teamId: 'lumbini_lions',
    teamName: 'Lumbini Lions',
    teamShortName: 'LL',
    primaryColor: '#B91C1C',
    played: 7,
    won: 1,
    lost: 6,
    tied: 0,
    noResult: 0,
    netRunRate: -1.060,
    points: 2,
    form: ['L', 'L', 'L', 'L', 'W'],
    logoEmoji: '🐅'
  }
];

export const INITIAL_MATCHES: Match[] = [
  {
    id: 'match-live-1',
    matchNumber: 22,
    stage: 'Super 4 / Qualifier 1',
    venue: 'Tribhuvan University International Cricket Ground, Kirtipur',
    dateTime: 'Today, 1:15 PM NPT',
    status: 'live',
    team1: NPL_TEAMS.janakpur_bolts,
    team2: NPL_TEAMS.sudurpaschim_royals,
    tossResult: 'Sudurpaschim Royals won the toss and elected to bowl first',
    team1Score: {
      runs: 174,
      wickets: 4,
      overs: 18.2,
      target: 175
    },
    team2Score: {
      runs: 168,
      wickets: 8,
      overs: 20.0
    },
    currentBattingTeamId: 'janakpur_bolts',
    requiredRunRate: 0.60,
    currentRunRate: 9.49,
    batters: [
      {
        name: 'James Neesham',
        runs: 54,
        balls: 28,
        fours: 4,
        sixes: 4,
        isStriker: true
      },
      {
        name: 'Aasif Sheikh (c)',
        runs: 62,
        balls: 41,
        fours: 6,
        sixes: 2,
        isStriker: false
      }
    ],
    bowler: {
      name: 'Scott Kuggeleijn',
      overs: 3.2,
      maidens: 0,
      runs: 31,
      wickets: 2,
      economy: 9.30
    },
    recentBalls: ['1', '4', '•', '6', '2', '1'],
    commentary: [
      {
        id: 'c-1',
        over: '18.2',
        runs: 1,
        isWicket: false,
        isFour: false,
        isSix: false,
        batter: 'James Neesham',
        bowler: 'Scott Kuggeleijn',
        description: 'Pushed gently down towards long-on for a single. Janakpur Bolts need only 1 run for a historic Final spot!',
        timestamp: 'Just now'
      },
      {
        id: 'c-2',
        over: '18.1',
        runs: 2,
        isWicket: false,
        isFour: false,
        isSix: false,
        batter: 'James Neesham',
        bowler: 'Scott Kuggeleijn',
        description: 'Full yorker sliced through deep backward point! Great running between the wickets by Neesham and Aasif!',
        timestamp: '1 min ago'
      },
      {
        id: 'c-3',
        over: '17.6',
        runs: 6,
        isWicket: false,
        isFour: false,
        isSix: true,
        batter: 'James Neesham',
        bowler: 'Dipendra Singh Airee',
        description: 'MASSIVE SIX! In the slot and launched high over deep midwicket into the roaring Kirtipur crowd!',
        timestamp: '2 mins ago'
      },
      {
        id: 'c-4',
        over: '17.5',
        runs: 0,
        isWicket: false,
        isFour: false,
        isSix: false,
        batter: 'James Neesham',
        bowler: 'Dipendra Singh Airee',
        description: 'Quicker off-break, defended on the front foot back to the bowler. Dot ball.',
        timestamp: '3 mins ago'
      },
      {
        id: 'c-5',
        over: '17.4',
        runs: 4,
        isWicket: false,
        isFour: true,
        isSix: false,
        batter: 'Aasif Sheikh',
        bowler: 'Dipendra Singh Airee',
        description: 'FOUR! Slog swept with authority between deep square leg and midwicket boundary.',
        timestamp: '4 mins ago'
      }
    ],
    winProbability: {
      team1: 88,
      team2: 12
    }
  },
  {
    id: 'match-upcoming-1',
    matchNumber: 23,
    stage: 'Eliminator',
    venue: 'Tribhuvan University International Cricket Ground, Kirtipur',
    dateTime: 'Tomorrow, 9:15 AM NPT',
    status: 'upcoming',
    team1: NPL_TEAMS.biratnagar_kings,
    team2: NPL_TEAMS.kathmandu_gurkhas,
    winProbability: {
      team1: 52,
      team2: 48
    }
  },
  {
    id: 'match-upcoming-2',
    matchNumber: 24,
    stage: 'Qualifier 2',
    venue: 'Tribhuvan University International Cricket Ground, Kirtipur',
    dateTime: 'Wednesday, 1:15 PM NPT',
    status: 'upcoming',
    team1: NPL_TEAMS.sudurpaschim_royals,
    team2: NPL_TEAMS.biratnagar_kings,
    winProbability: {
      team1: 55,
      team2: 45
    }
  },
  {
    id: 'match-completed-1',
    matchNumber: 21,
    stage: 'League Match 21',
    venue: 'TU Cricket Ground, Kirtipur',
    dateTime: 'Yesterday',
    status: 'completed',
    team1: NPL_TEAMS.chitwan_rhinos,
    team2: NPL_TEAMS.pokhara_avengers,
    team1Score: {
      runs: 161,
      wickets: 7,
      overs: 20.0
    },
    team2Score: {
      runs: 153,
      wickets: 9,
      overs: 20.0
    },
    resultSummary: 'Chitwan Rhinos won by 8 runs',
    manOfTheMatch: 'Kushal Malla (68 off 38 & 2/22)'
  },
  {
    id: 'match-completed-2',
    matchNumber: 20,
    stage: 'League Match 20',
    venue: 'TU Cricket Ground, Kirtipur',
    dateTime: 'Oct 25',
    status: 'completed',
    team1: NPL_TEAMS.karnali_yaks,
    team2: NPL_TEAMS.biratnagar_kings,
    team1Score: {
      runs: 182,
      wickets: 5,
      overs: 20.0
    },
    team2Score: {
      runs: 185,
      wickets: 4,
      overs: 19.1
    },
    resultSummary: 'Biratnagar Kings won by 6 wickets',
    manOfTheMatch: 'Martin Guptill (84 off 46)'
  }
];

export const TOP_BATSMEN: PlayerStat[] = [
  {
    id: 'bat-1',
    name: 'Aasif Sheikh',
    teamId: 'janakpur_bolts',
    teamName: 'Janakpur Bolts',
    role: 'Batter',
    matches: 7,
    runs: 312,
    average: 52.0,
    strikeRate: 148.5,
    fifties: 3,
    hundreds: 0,
    sixes: 16,
    fours: 32,
    highestScore: '78*',
    isCapHolder: true // Orange Cap
  },
  {
    id: 'bat-2',
    name: 'Martin Guptill',
    teamId: 'biratnagar_kings',
    teamName: 'Biratnagar Kings',
    role: 'Batter',
    matches: 7,
    runs: 288,
    average: 48.0,
    strikeRate: 162.2,
    fifties: 3,
    hundreds: 0,
    sixes: 22,
    fours: 26,
    highestScore: '86'
  },
  {
    id: 'bat-3',
    name: 'Dipendra Singh Airee',
    teamId: 'sudurpaschim_royals',
    teamName: 'Sudurpaschim Royals',
    role: 'All-Rounder',
    matches: 7,
    runs: 265,
    average: 44.1,
    strikeRate: 154.0,
    fifties: 2,
    hundreds: 0,
    sixes: 18,
    fours: 24,
    highestScore: '71*'
  },
  {
    id: 'bat-4',
    name: 'Kushal Bhurtel',
    teamId: 'pokhara_avengers',
    teamName: 'Pokhara Avengers',
    role: 'Batter',
    matches: 7,
    runs: 242,
    average: 34.5,
    strikeRate: 139.0,
    fifties: 2,
    hundreds: 0,
    sixes: 12,
    fours: 28,
    highestScore: '65'
  },
  {
    id: 'bat-5',
    name: 'Shikhar Dhawan',
    teamId: 'karnali_yaks',
    teamName: 'Karnali Yaks',
    role: 'Batter',
    matches: 6,
    runs: 226,
    average: 45.2,
    strikeRate: 138.6,
    fifties: 2,
    hundreds: 0,
    sixes: 9,
    fours: 30,
    highestScore: '72'
  }
];

export const TOP_BOWLERS: PlayerStat[] = [
  {
    id: 'bowl-1',
    name: 'Sandeep Lamichhane',
    teamId: 'biratnagar_kings',
    teamName: 'Biratnagar Kings',
    role: 'Bowler',
    matches: 7,
    wickets: 15,
    average: 13.8,
    economy: 6.12,
    bestBowling: '4/18',
    isCapHolder: true // Purple Cap
  },
  {
    id: 'bowl-2',
    name: 'Karan KC',
    teamId: 'kathmandu_gurkhas',
    teamName: 'Kathmandu Gurkhas',
    role: 'Bowler',
    matches: 7,
    wickets: 13,
    average: 16.2,
    economy: 7.24,
    bestBowling: '3/15'
  },
  {
    id: 'bowl-3',
    name: 'Scott Kuggeleijn',
    teamId: 'sudurpaschim_royals',
    teamName: 'Sudurpaschim Royals',
    role: 'Bowler',
    matches: 7,
    wickets: 12,
    average: 18.0,
    economy: 7.85,
    bestBowling: '3/20'
  },
  {
    id: 'bowl-4',
    name: 'Sompal Kami',
    teamId: 'karnali_yaks',
    teamName: 'Karnali Yaks',
    role: 'All-Rounder',
    matches: 7,
    wickets: 11,
    average: 20.1,
    economy: 7.90,
    bestBowling: '3/28'
  },
  {
    id: 'bowl-5',
    name: 'Kishore Mahato',
    teamId: 'janakpur_bolts',
    teamName: 'Janakpur Bolts',
    role: 'Bowler',
    matches: 7,
    wickets: 11,
    average: 19.4,
    economy: 7.42,
    bestBowling: '3/19'
  }
];

export const TEAM_SQUADS: Record<string, { role: string; name: string; isOverseas?: boolean; isIcon?: boolean }[]> = {
  janakpur_bolts: [
    { role: 'Captain / Wicketkeeper', name: 'Aasif Sheikh', isIcon: true },
    { role: 'Overseas All-Rounder', name: 'James Neesham (NZ)', isOverseas: true },
    { role: 'Overseas Batter', name: 'Lahiru Milantha (USA)', isOverseas: true },
    { role: 'Overseas Fast Bowler', name: 'Mohammad Mohsin (USA)', isOverseas: true },
    { role: 'Fast Bowler', name: 'Kishore Mahato' },
    { role: 'All-Rounder', name: 'Anil Sah' },
    { role: 'Bowler', name: 'Lalit Rajbanshi' },
    { role: 'Batter', name: 'Rupesh Singh' },
    { role: 'All-Rounder', name: 'Shubh Kansakar' },
    { role: 'Bowler', name: 'Bikram Sob' }
  ],
  sudurpaschim_royals: [
    { role: 'Captain / All-Rounder', name: 'Dipendra Singh Airee', isIcon: true },
    { role: 'Overseas Batter', name: 'Brandon McMullen (SCO)', isOverseas: true },
    { role: 'Overseas Fast Bowler', name: 'Scott Kuggeleijn (NZ)', isOverseas: true },
    { role: 'Overseas All-Rounder', name: 'Saif Zaib (ENG)', isOverseas: true },
    { role: 'Wicketkeeper / Batter', name: 'Aarif Sheikh' },
    { role: 'Fast Bowler', name: 'Abinash Bohara' },
    { role: 'Batter', name: 'Binod Bhandari' },
    { role: 'All-Rounder', name: 'Ishank Jaggi' },
    { role: 'Bowler', name: 'Naresh Budhayer' }
  ],
  biratnagar_kings: [
    { role: 'Captain / Leg-spinner', name: 'Sandeep Lamichhane', isIcon: true },
    { role: 'Overseas Batter', name: 'Martin Guptill (NZ)', isOverseas: true },
    { role: 'Overseas Fast Bowler', name: 'Chris Sole (SCO)', isOverseas: true },
    { role: 'Overseas All-Rounder', name: 'Aqib Ilyas (OMA)', isOverseas: true },
    { role: 'Batter', name: 'Lokesh Bam' },
    { role: 'All-Rounder', name: 'Pratish GC' },
    { role: 'Bowler', name: 'Bashir Ahmad' },
    { role: 'Wicketkeeper', name: 'Jitendra Mukhiya' }
  ],
  kathmandu_gurkhas: [
    { role: 'Captain / Fast Bowler', name: 'Karan KC', isIcon: true },
    { role: 'Overseas Batter', name: 'Michael Levitt (NED)', isOverseas: true },
    { role: 'Overseas All-Rounder', name: 'Gerhard Erasmus (NAM)', isOverseas: true },
    { role: 'Overseas Bowler', name: 'Dan Douthwaite (ENG)', isOverseas: true },
    { role: 'Batter', name: 'Bhim Sharki' },
    { role: 'Spin Bowler', name: 'Shahab Alam' },
    { role: 'Wicketkeeper', name: 'Raju Rijal' }
  ],
  pokhara_avengers: [
    { role: 'Captain / Batter', name: 'Kushal Bhurtel', isIcon: true },
    { role: 'Overseas All-Rounder', name: 'Matt Critchley (ENG)', isOverseas: true },
    { role: 'Overseas All-Rounder', name: 'Raymon Reifer (WI)', isOverseas: true },
    { role: 'Overseas Bowler', name: 'Anderson Phillip (WI)', isOverseas: true },
    { role: 'Batter', name: 'Dinesh Kharel' },
    { role: 'Bowler', name: 'Bipin Khatri' },
    { role: 'Spin Bowler', name: 'Sagar Dhakal' }
  ],
  chitwan_rhinos: [
    { role: 'Captain / All-Rounder', name: 'Kushal Malla', isIcon: true },
    { role: 'Overseas Fast Bowler', name: 'Marchant de Lange (SA)', isOverseas: true },
    { role: 'Overseas All-Rounder', name: 'Luke Benkenstein (ENG)', isOverseas: true },
    { role: 'Overseas Batter', name: 'Hassan Eisakhil (AFG)', isOverseas: true },
    { role: 'Fast Bowler', name: 'Rijan Dhakal' },
    { role: 'Bowler', name: 'Kamal Singh Airee' },
    { role: 'Batter', name: 'Sharad Vesawkar' }
  ],
  karnali_yaks: [
    { role: 'Captain / Fast Bowler', name: 'Sompal Kami', isIcon: true },
    { role: 'Overseas Marquee Batter', name: 'Shikhar Dhawan (IND)', isOverseas: true },
    { role: 'Overseas Wicketkeeper', name: 'Chadwick Walton (WI)', isOverseas: true },
    { role: 'Overseas Bowler', name: 'Zeeshan Maqsood (OMA)', isOverseas: true },
    { role: 'All-Rounder', name: 'Gulshan Jha' },
    { role: 'Bowler', name: 'Nandan Yadav' },
    { role: 'Batter', name: 'Dev Khanal' }
  ],
  lumbini_lions: [
    { role: 'Captain / Batter', name: 'Rohit Paudel', isIcon: true },
    { role: 'Overseas All-Rounder', name: 'Ben Cutting (AUS)', isOverseas: true },
    { role: 'Overseas Wicketkeeper', name: 'Tom Moores (ENG)', isOverseas: true },
    { role: 'Overseas Bowler', name: 'Ramon Simmonds (WI)', isOverseas: true },
    { role: 'Fast Bowler', name: 'Durgesh Gupta' },
    { role: 'Spin Bowler', name: 'Surya Tamang' },
    { role: 'Batter', name: 'Sundeep Jora' }
  ]
};
