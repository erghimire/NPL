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
                  className="w-13 h-13 rounded-xl flex items-center justify-center p-1.5 mb-2 shadow border border-white/10 transition group-hover:scale-105 bg-slate-900/90 shrink-0"
                  style={{ borderColor: `${team.primaryColor}50` }}
                >
                  {team.logoUrl ? (
                    <img
                      src={team.logoUrl}
                      alt={team.name}
                      className="w-full h-full object-contain filter drop-shadow"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        if (e.currentTarget.nextElementSibling) {
                          (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'block';
                        }
                      }}
                    />
                  ) : null}
                  <span className={team.logoUrl ? 'hidden text-2xl' : 'text-2xl'}>{team.logoEmoji}</span>
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
          <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden space-y-4">
            {/* Franchise Banner */}
            {(() => {
              const team = NPL_TEAMS[selectedTeamId];
              const squad = TEAM_SQUADS[selectedTeamId] || [];

              const PLAYER_PHOTO_MAP: Record<string, string> = {
                'Aasif Sheikh': '/assets/players/aasif-sheikh.jpg',
                'Dipendra Singh Airee': '/assets/players/dipendra-singh-airee.jpg',
                'Sandeep Lamichhane': '/assets/players/sandeep-lamichhane.png',
                'Rohit Paudel': '/assets/players/rohit-paudel.jpg',
                'Sompal Kami': '/assets/players/sompal-kami.jpg',
                'Karan KC': '/assets/players/karan-kc.jpg',
                'Kushal Bhurtel': '/assets/players/kushal-bhurtel.jpg',
                'Martin Guptill': '/assets/players/martin-guptill.jpg',
                'Shikhar Dhawan': '/assets/players/shikhar-dhawan.jpg',
                'Scott Kuggeleijn': '/assets/players/scott-kuggeleijn.jpg'
              };

              return (
                <>
                  {/* Hero Banner Header */}
                  <div className="relative">
                    {team.bannerUrl ? (
                      <div className="h-32 sm:h-44 w-full relative overflow-hidden bg-slate-900">
                        <img
                          src={team.bannerUrl}
                          alt={`${team.name} Official Banner`}
                          className="w-full h-full object-cover object-center filter brightness-80 hover:scale-105 transition duration-700"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-white flex items-center gap-1.5 shadow">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: team.primaryColor }} />
                          <span>Owner: {team.owner}</span>
                        </div>
                      </div>
                    ) : null}

                    {/* Team Info Card Overlay */}
                    <div className="p-3.5 sm:p-4 bg-slate-900/95 flex flex-wrap items-center justify-between gap-3 relative -mt-8 mx-3 rounded-xl border border-slate-800 backdrop-blur-md shadow-xl">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center p-1.5 bg-slate-950 border-2 shadow-xl shrink-0"
                          style={{ borderColor: team.primaryColor }}
                        >
                          {team.logoUrl ? (
                            <img
                              src={team.logoUrl}
                              alt={team.name}
                              className="w-full h-full object-contain filter drop-shadow"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                if (e.currentTarget.nextElementSibling) {
                                  (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'block';
                                }
                              }}
                            />
                          ) : null}
                          <span className={team.logoUrl ? 'hidden text-3xl' : 'text-3xl'}>{team.logoEmoji}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-extrabold text-white text-base sm:text-lg">
                              {team.name}
                            </h4>
                            <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono font-bold border border-slate-700">
                              {team.shortName}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            <span>{team.homeVenue}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 sm:gap-3 text-xs">
                        <div className="bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800 text-right">
                          <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Captain</div>
                          <div className="font-bold text-white">{team.captain}</div>
                        </div>
                        <div className="bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800 text-right">
                          <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Marquee Star</div>
                          <div className="font-bold text-amber-400">{team.marqueePlayer}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Squad List */}
                  <div className="p-4 pt-0">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-blue-400" />
                      Official 2026 Squad & Overseas Stars
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {squad.map((player, idx) => {
                        const playerPhoto = PLAYER_PHOTO_MAP[player.name];

                        return (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 text-xs hover:border-slate-700 transition"
                          >
                            <div className="flex items-center gap-2.5">
                              {playerPhoto ? (
                                <img
                                  src={playerPhoto}
                                  alt={player.name}
                                  className="w-7 h-7 rounded-full object-cover border border-slate-700 shrink-0 shadow-sm"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                  }}
                                />
                              ) : (
                                <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-[10px] text-slate-300 font-bold border border-slate-700 shrink-0">
                                  {player.name.slice(0, 2).toUpperCase()}
                                </div>
                              )}
                              <div>
                                <div className="flex items-center gap-1.5">
                                  {player.isIcon && (
                                    <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
                                  )}
                                  <span className="font-semibold text-white">
                                    {player.name}
                                  </span>
                                  {player.isOverseas && (
                                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                                      Overseas
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            <span className="text-[11px] text-slate-400 font-mono">
                              {player.role}
                            </span>
                          </div>
                        );
                      })}
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
