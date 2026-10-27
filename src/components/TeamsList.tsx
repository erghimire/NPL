import React, { useState } from 'react';
import { Shield, Users, MapPin, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { NPL_TEAMS, TEAM_SQUADS } from '../data/nplData';
import { Team } from '../types/npl';

export const TeamsList: React.FC = () => {
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>('janakpur_bolts');

  const teamList = Object.values(NPL_TEAMS);

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden mb-6">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-extrabold text-white">
              NPL FRANCHISES & SQUADS
            </h2>
            <p className="text-[11px] text-slate-400">
              All 8 official franchises, icon captains & overseas marquee stars
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Franchises Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {teamList.map((team) => {
            const isSelected = selectedTeamId === team.id;

            return (
              <button
                key={team.id}
                onClick={() => setSelectedTeamId(team.id)}
                className={`p-3 rounded-xl border text-left transition flex flex-col items-center justify-center text-center relative overflow-hidden group ${
                  isSelected
                    ? 'bg-slate-800 border-amber-400 shadow-lg shadow-amber-500/10'
                    : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800/50 hover:border-slate-700'
                }`}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-2 shadow border border-white/10 transition group-hover:scale-105"
                  style={{ backgroundColor: `${team.primaryColor}25` }}
                >
                  {team.logoEmoji}
                </div>

                <h3 className="font-bold text-white text-xs leading-tight line-clamp-1">
                  {team.name}
                </h3>
                <span className="text-[10px] text-slate-400 mt-0.5">
                  {team.city}
                </span>

                <div
                  className="absolute bottom-0 left-0 right-0 h-1"
                  style={{ backgroundColor: team.primaryColor }}
                ></div>
              </button>
            );
          })}
        </div>

        {/* Selected Team Profile & Roster */}
        {selectedTeamId && NPL_TEAMS[selectedTeamId] && (
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
            {/* Franchise Banner */}
            {(() => {
              const team = NPL_TEAMS[selectedTeamId];
              const squad = TEAM_SQUADS[selectedTeamId] || [];

              return (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl border border-white/10"
                        style={{ backgroundColor: `${team.primaryColor}30` }}
                      >
                        {team.logoEmoji}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-white text-base">
                            {team.name}
                          </h4>
                          <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono font-bold">
                            {team.shortName}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          <span>{team.homeVenue}</span>
                        </p>
                      </div>
                    </div>

                    <div className="text-right text-xs">
                      <div className="text-slate-400">
                        Captain: <span className="font-bold text-white">{team.captain}</span>
                      </div>
                      <div className="text-amber-400 text-[11px] font-semibold mt-0.5">
                        Marquee: {team.marqueePlayer}
                      </div>
                    </div>
                  </div>

                  {/* Squad List */}
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-blue-400" />
                      Franchise Squad & Overseas Stars
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {squad.map((player, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800/80 text-xs"
                        >
                          <div className="flex items-center gap-2">
                            {player.isIcon && (
                              <Star className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            )}
                            {player.isOverseas && (
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                                Overseas
                              </span>
                            )}
                            <span className="font-semibold text-white">
                              {player.name}
                            </span>
                          </div>

                          <span className="text-[11px] text-slate-400">
                            {player.role}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};
