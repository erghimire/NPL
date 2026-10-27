import { useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Match, StandingsEntry, BallCommentary, BatterScore } from '../types/npl';
import { INITIAL_MATCHES, INITIAL_STANDINGS } from '../data/nplData';
import { cricketSound } from '../utils/audio';
import { notificationService } from '../services/notificationService';
import { liveDataSync, WikiSyncResult } from '../services/liveDataSyncService';

const COMMENTARY_TEMPLATES = [
  {
    type: 'four',
    descriptions: [
      'CRACKED AWAY! Short and punished through backward point for a blistering FOUR!',
      'GLORIOUS COVER DRIVE! Right out of the sweet spot, races away to the boundary ropes!',
      'EDGED AND GONE TO THE FENCE! Flys past the diving slip fielder for FOUR!',
      'STEPPED OUT AND SMACKED! Lofted inside-out over extra cover, one bounce into the fence!'
    ]
  },
  {
    type: 'six',
    descriptions: [
      'DISPATCHED INTO ORBIT! In the slot and hoisted 95 meters deep into the Tribhuvan ground crowd! HUGE SIX!',
      'STAND AND DELIVER! Picked up cleanly off the pads and sailed over deep square leg!',
      'SWEPT INTO THE MOUNTAINS! Maximum over mid-wicket, the crowd at Kirtipur is on their feet!',
      'THAT IS COLOSSAL! Down the track and cleared the sight screen with majestic poise!'
    ]
  },
  {
    type: 'wicket',
    descriptions: [
      'OUT! TIMBER! Clean bowled through the gate! The stumps are rattled and the fielding team erupts!',
      'CAUGHT AT LONG-OFF! Tried to clear the boundary but didn\'t get all of it, safe hands in the deep!',
      'LBW! Struck right in front of middle stump! Finger goes up without hesitation!',
      'EDGED AND TAKEN! Wicketkeeper takes a sharp diving catch to his right! Big breakthrough!'
    ]
  },
  {
    type: 'single',
    descriptions: [
      'Driven gently down to long-on for a comfortable single.',
      'Tucked off the hips towards deep square leg, rotates the strike.',
      'Pushed to mid-off and they scamper through for a quick single.',
      'Dabbed down to third man with soft hands, easily taken.'
    ]
  },
  {
    type: 'two',
    descriptions: [
      'Whipped through midwicket, great call and sharp running converts one into TWO!',
      'Punched into the deep cover pocket, excellent hustle between the wickets.'
    ]
  },
  {
    type: 'dot',
    descriptions: [
      'Beaten on the outside edge! Sharp bounce and nip away from the right-hander.',
      'Good length on off stump, solid forward defensive push back to the bowler.',
      'Yorker right on the blockhole, squeezed out safely. No run.',
      'Bouncer! Ducked under safely, well directed by the bowler.'
    ]
  }
];

const BENCH_BATTERS = [
  'Anil Sah',
  'Lahiru Milantha (USA)',
  'Rupesh Singh',
  'Kishore Mahato',
  'Lalit Rajbanshi'
];

export function useLiveMatchSimulation() {
  const [matches, setMatches] = useState<Match[]>(INITIAL_MATCHES);
  const [standings, setStandings] = useState<StandingsEntry[]>(INITIAL_STANDINGS);
  const [isAutoUpdating, setIsAutoUpdating] = useState<boolean>(true);
  const [lastUpdatedTime, setLastUpdatedTime] = useState<Date>(new Date());
  const [eventAlert, setEventAlert] = useState<{ text: string; type: 'six' | 'four' | 'wicket' | 'milestone' | 'win' } | null>(null);

  const [isWikiSynced, setIsWikiSynced] = useState<boolean>(false);
  const [isSyncingWiki, setIsSyncingWiki] = useState<boolean>(false);
  const [wikiLastSync, setWikiLastSync] = useState<string>('');
  const [wikiSeasonInfo, setWikiSeasonInfo] = useState<string>('Siddhartha Bank NPL 2026 • Live from TU Ground, Kirtipur');

  // Keep track of milestones (50 or 100) already reached by batters in this innings
  const reachedMilestones = useRef<Set<string>>(new Set(['James Neesham-50', 'Aasif Sheikh-50']));
  const nextBatterIndex = useRef<number>(0);

  // Sync real-time NPL 2026 data from Wikipedia & Google/Cricinfo
  const syncWithWikipedia = useCallback(async () => {
    setIsSyncingWiki(true);
    try {
      const data = await liveDataSync.fetchLive2026Data();
      if (data) {
        if (data.standings && data.standings.length > 0) {
          setStandings(data.standings);
        }
        if (data.matches && data.matches.length > 0) {
          setMatches((prev) => {
            const currentLive = prev.find((m) => m.status === 'live');
            return data.matches.map((m) => {
              if (m.status === 'live' && currentLive) {
                return { ...m, ...currentLive, id: m.id, stage: m.stage };
              }
              return m;
            });
          });
        }
        setIsWikiSynced(true);
        setWikiLastSync(data.lastUpdated);
        if (data.extract) {
          setWikiSeasonInfo(data.extract);
        }
      }
    } catch (e) {
      console.warn('Sync failed', e);
    } finally {
      setIsSyncingWiki(false);
    }
  }, []);

  // Initial and periodic Wikipedia live data fetch
  useEffect(() => {
    syncWithWikipedia();
    const wikiTimer = setInterval(() => {
      syncWithWikipedia();
    }, 45000);
    return () => clearInterval(wikiTimer);
  }, [syncWithWikipedia]);

  // Trigger next ball simulation
  const simulateNextBall = useCallback((forcedOutcome?: 'wicket' | 'fifty' | 'century' | 'six' | 'four') => {
    setMatches((prevMatches) => {
      const matchIndex = prevMatches.findIndex((m) => m.status === 'live');
      if (matchIndex === -1) return prevMatches;

      const liveMatch = { ...prevMatches[matchIndex] };
      if (!liveMatch.team1Score || !liveMatch.batters || !liveMatch.bowler) return prevMatches;

      const currentOvers = liveMatch.team1Score.overs;
      const totalOvers = 20.0;

      // Check if match already reached target
      const target = liveMatch.team1Score.target || 175;
      if (liveMatch.team1Score.runs >= target || liveMatch.team1Score.wickets >= 10 || currentOvers >= totalOvers) {
        return prevMatches;
      }

      // Calculate next ball over notation (e.g. 18.2 -> 18.3, 18.5 -> 19.0)
      const currentFullOvers = Math.floor(currentOvers);
      const currentBallsInOver = Math.round((currentOvers - currentFullOvers) * 10);
      let nextBalls = currentBallsInOver + 1;
      let nextFullOvers = currentFullOvers;
      let isOverFinished = false;

      if (nextBalls >= 6) {
        nextBalls = 0;
        nextFullOvers += 1;
        isOverFinished = true;
      }

      const nextOverNumber = Number(`${nextFullOvers}.${nextBalls}`);

      // Probabilistic or forced ball outcome
      let ballResult: 'dot' | 'single' | 'two' | 'four' | 'six' | 'wicket';
      let runsScored = 0;
      let isWicket = false;
      let isFour = false;
      let isSix = false;

      const updatedBatters = [...liveMatch.batters];
      const strikerIdx = updatedBatters.findIndex((b) => b.isStriker);
      const currentStriker = strikerIdx !== -1 ? updatedBatters[strikerIdx] : null;

      if (forcedOutcome === 'wicket') {
        ballResult = 'wicket';
        isWicket = true;
        runsScored = 0;
      } else if (forcedOutcome === 'fifty') {
        ballResult = 'four';
        isFour = true;
        runsScored = 4;
        if (currentStriker) {
          currentStriker.runs = 46; // sets up to hit 50!
        }
      } else if (forcedOutcome === 'century') {
        ballResult = 'six';
        isSix = true;
        runsScored = 6;
        if (currentStriker) {
          currentStriker.runs = 94; // sets up to hit 100!
        }
      } else if (forcedOutcome === 'six') {
        ballResult = 'six';
        isSix = true;
        runsScored = 6;
      } else if (forcedOutcome === 'four') {
        ballResult = 'four';
        isFour = true;
        runsScored = 4;
      } else {
        const rand = Math.random();
        if (rand < 0.28) {
          ballResult = 'single';
          runsScored = 1;
        } else if (rand < 0.48) {
          ballResult = 'dot';
          runsScored = 0;
        } else if (rand < 0.62) {
          ballResult = 'four';
          runsScored = 4;
          isFour = true;
        } else if (rand < 0.74) {
          ballResult = 'two';
          runsScored = 2;
        } else if (rand < 0.88) {
          ballResult = 'six';
          runsScored = 6;
          isSix = true;
        } else {
          ballResult = 'wicket';
          isWicket = true;
          runsScored = 0;
        }
      }

      // Update team score
      const newRuns = liveMatch.team1Score.runs + runsScored;
      const newWickets = liveMatch.team1Score.wickets + (isWicket ? 1 : 0);

      // Handle Batters and Milestones
      if (strikerIdx !== -1 && currentStriker) {
        const oldRuns = currentStriker.runs;
        currentStriker.runs += runsScored;
        currentStriker.balls += 1;
        if (isFour) currentStriker.fours += 1;
        if (isSix) currentStriker.sixes += 1;

        // Check 50 / 100 Milestone triggers
        const milestone50Key = `${currentStriker.name}-50`;
        const milestone100Key = `${currentStriker.name}-100`;

        if (oldRuns < 50 && currentStriker.runs >= 50 && !reachedMilestones.current.has(milestone50Key)) {
          reachedMilestones.current.add(milestone50Key);
          notificationService.notifyMilestone({
            batter: currentStriker.name,
            runs: currentStriker.runs,
            balls: currentStriker.balls,
            team: liveMatch.team1.name,
            type: '50',
            fours: currentStriker.fours,
            sixes: currentStriker.sixes
          });
          setEventAlert({ text: `🔥 FIFTY REACHED! 50 FOR ${currentStriker.name.toUpperCase()}! 👏`, type: 'milestone' });
          confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
        } else if (oldRuns < 100 && currentStriker.runs >= 100 && !reachedMilestones.current.has(milestone100Key)) {
          reachedMilestones.current.add(milestone100Key);
          notificationService.notifyMilestone({
            batter: currentStriker.name,
            runs: currentStriker.runs,
            balls: currentStriker.balls,
            team: liveMatch.team1.name,
            type: '100',
            fours: currentStriker.fours,
            sixes: currentStriker.sixes
          });
          setEventAlert({ text: `🌟 CENTURY! 100 FOR ${currentStriker.name.toUpperCase()}! 🏆`, type: 'milestone' });
          confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
        }

        // Handle Wicket Dismissal & Push Notification
        if (isWicket) {
          const dismissalText = `b ${liveMatch.bowler.name}`;
          const dismissedBatterName = currentStriker.name;
          currentStriker.dismissal = dismissalText;

          // Trigger Push Notification for Wicket!
          notificationService.notifyWicket({
            bowler: liveMatch.bowler.name,
            batter: dismissedBatterName,
            team: liveMatch.team1.name,
            score: `${newRuns}/${newWickets}`,
            over: `${nextOverNumber.toFixed(1)}`,
            dismissal: dismissalText
          });

          setEventAlert({
            text: `💥 WICKET! ${liveMatch.bowler.name} DISMISSES ${dismissedBatterName.toUpperCase()}!`,
            type: 'wicket'
          });

          // Bring in new incoming batter from bench if wickets < 10
          if (newWickets < 10) {
            const nextBatterName = BENCH_BATTERS[nextBatterIndex.current % BENCH_BATTERS.length];
            nextBatterIndex.current += 1;
            const newBatter: BatterScore = {
              name: nextBatterName,
              runs: 0,
              balls: 0,
              fours: 0,
              sixes: 0,
              isStriker: true
            };
            updatedBatters[strikerIdx] = newBatter;
          }
        } else {
          // Regular strike rotation
          let rotateStrike = runsScored % 2 !== 0;
          if (isOverFinished) {
            rotateStrike = !rotateStrike;
          }

          if (rotateStrike && updatedBatters.length > 1) {
            updatedBatters[0].isStriker = !updatedBatters[0].isStriker;
            updatedBatters[1].isStriker = !updatedBatters[1].isStriker;
          } else {
            updatedBatters[strikerIdx] = currentStriker;
          }
        }
      }

      // Audio & Visual alert for boundaries
      if (isSix) {
        cricketSound.playBoundary();
        if (!eventAlert) {
          setEventAlert({ text: '🔥 HUGE SIX! 6 RUNS!', type: 'six' });
        }
      } else if (isFour && !eventAlert) {
        cricketSound.playBoundary();
        setEventAlert({ text: '⚡ BOUNDARY FOUR! 4 RUNS!', type: 'four' });
      }

      setTimeout(() => setEventAlert(null), 3000);

      // Update Bowler
      const updatedBowler = { ...liveMatch.bowler };
      updatedBowler.runs += runsScored;
      if (isWicket) updatedBowler.wickets += 1;
      const totalBowlerBalls = Math.floor(updatedBowler.overs) * 6 + Math.round((updatedBowler.overs - Math.floor(updatedBowler.overs)) * 10) + 1;
      const updatedBowlerOvers = Math.floor(totalBowlerBalls / 6) + (totalBowlerBalls % 6) / 10;
      updatedBowler.overs = Number(updatedBowlerOvers.toFixed(1));
      updatedBowler.economy = Number(((updatedBowler.runs / totalBowlerBalls) * 6).toFixed(2));

      // Recent balls ticker
      const ballToken = isWicket ? 'W' : runsScored === 0 ? '•' : String(runsScored);
      const recentBalls = [ballToken, ...(liveMatch.recentBalls || []).slice(0, 5)];

      // Commentary Generator
      const templateGroup = COMMENTARY_TEMPLATES.find((t) => t.type === ballResult);
      const descList = templateGroup?.descriptions || ['Good ball played away.'];
      const randomDesc = descList[Math.floor(Math.random() * descList.length)];
      const overStr = `${currentFullOvers}.${currentBallsInOver + 1}`;

      const newCommentaryItem: BallCommentary = {
        id: `c-${Date.now()}`,
        over: overStr,
        runs: runsScored,
        isWicket,
        isFour,
        isSix,
        batter: updatedBatters.find((b) => b.isStriker)?.name || 'Striker',
        bowler: liveMatch.bowler.name,
        description: isWicket
          ? `OUT! Wicket falls! ${liveMatch.bowler.name} cleans up with a beauty! ${randomDesc}`
          : randomDesc,
        timestamp: 'Just now'
      };

      const updatedCommentary = [newCommentaryItem, ...(liveMatch.commentary || []).slice(0, 15)];

      // Win probability recalculation
      const runsRemaining = Math.max(0, target - newRuns);
      const totalBallsRemaining = Math.max(1, 120 - (nextFullOvers * 6 + nextBalls));
      const requiredRR = runsRemaining <= 0 ? 0 : Number(((runsRemaining / totalBallsRemaining) * 6).toFixed(2));
      const currentRR = Number(((newRuns / (nextFullOvers * 6 + nextBalls || 1)) * 6).toFixed(2));

      let team1WinProb = Math.min(99, Math.max(1, Math.round(100 - (runsRemaining * 100) / 30)));
      if (newRuns >= target) team1WinProb = 100;
      if (newWickets >= 10 && newRuns < target) team1WinProb = 0;

      // Check if match just concluded!
      let newStatus: 'live' | 'upcoming' | 'completed' = 'live';
      let resultSummary = liveMatch.resultSummary;

      if (newRuns >= target) {
        newStatus = 'completed';
        const remainingWickets = 10 - newWickets;
        resultSummary = `${liveMatch.team1.name} won by ${remainingWickets} wickets (${Math.max(0, 120 - (nextFullOvers * 6 + nextBalls))} balls remaining)!`;
        setEventAlert({ text: `🏆 ${liveMatch.team1.name} QUALIFIES FOR NPL FINAL!`, type: 'win' });
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });

        // Automatically update the standings table!
        setStandings((prev) => {
          return prev.map((entry) => {
            if (entry.teamId === liveMatch.team1.id) {
              return {
                ...entry,
                played: entry.played + 1,
                won: entry.won + 1,
                points: entry.points + 2,
                netRunRate: Number((entry.netRunRate + 0.15).toFixed(3)),
                form: ['W', ...entry.form.slice(0, 4)] as ('W' | 'L' | 'NR')[]
              };
            }
            if (entry.teamId === liveMatch.team2.id) {
              return {
                ...entry,
                played: entry.played + 1,
                lost: entry.lost + 1,
                netRunRate: Number((entry.netRunRate - 0.12).toFixed(3)),
                form: ['L', ...entry.form.slice(0, 4)] as ('W' | 'L' | 'NR')[]
              };
            }
            return entry;
          }).sort((a, b) => b.points !== a.points ? b.points - a.points : b.netRunRate - a.netRunRate)
            .map((e, idx) => ({ ...e, rank: idx + 1 }));
        });
      }

      const updatedLiveMatch: Match = {
        ...liveMatch,
        status: newStatus,
        resultSummary,
        team1Score: {
          ...liveMatch.team1Score,
          runs: newRuns,
          wickets: newWickets,
          overs: nextOverNumber
        },
        currentRunRate: currentRR,
        requiredRunRate: requiredRR,
        batters: updatedBatters,
        bowler: updatedBowler,
        recentBalls,
        commentary: updatedCommentary,
        winProbability: {
          team1: team1WinProb,
          team2: 100 - team1WinProb
        }
      };

      const copyMatches = [...prevMatches];
      copyMatches[matchIndex] = updatedLiveMatch;
      return copyMatches;
    });

    setLastUpdatedTime(new Date());
  }, []);

  // Interval for real-time automatic score updates
  useEffect(() => {
    if (!isAutoUpdating) return;
    const timer = setInterval(() => {
      simulateNextBall();
    }, 6000); // realistic 6 second ball updates

    return () => clearInterval(timer);
  }, [isAutoUpdating, simulateNextBall]);

  // Reset demo match to live action
  const resetMatch = () => {
    reachedMilestones.current = new Set(['James Neesham-50', 'Aasif Sheikh-50']);
    nextBatterIndex.current = 0;
    setMatches(INITIAL_MATCHES);
    setStandings(INITIAL_STANDINGS);
    setLastUpdatedTime(new Date());
  };

  return {
    matches,
    standings,
    isAutoUpdating,
    setIsAutoUpdating,
    lastUpdatedTime,
    eventAlert,
    simulateNextBall,
    resetMatch,
    isWikiSynced,
    isSyncingWiki,
    wikiLastSync,
    wikiSeasonInfo,
    syncWithWikipedia
  };
}
