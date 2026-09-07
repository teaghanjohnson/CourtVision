"use client";

import { useState } from "react";
import TeamPlayersTable, { Player } from "./TeamPlayersTable";
import TeamStatsSummary, { Team } from "./TeamStatsSummary";
import TeamRoster, { RosterEntry } from "./TeamRoster";

type Tab = "roster" | "playerStats" | "teamStats";

export default function TeamDashboard({
  players,
  teamStats,
  roster,
  years,
  defaultYear,
  leagueWide = false,
}: {
  players: Player[];
  teamStats: Team[];
  roster: RosterEntry[];
  years: string[];
  defaultYear: string;
  leagueWide?: boolean;
}) {
  const [activeTab, setActiveTab] = useState<Tab>("playerStats");
  const [selectedYear, setSelectedYear] = useState(defaultYear);
  const yearsDescending = [...years].reverse();

  const tab: Tab =
    leagueWide && activeTab === "roster" ? "playerStats" : activeTab;

  return (
    <div>
      <select
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
        className="mb-4 rounded border px-2 py-1"
      >
        {yearsDescending.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <div className="overflow-x-auto">
        <div className="buttons-container">
          {!leagueWide && (
            <button className="team-btns" onClick={() => setActiveTab("roster")}>
              Roster
            </button>
          )}
          <button
            className="team-btns"
            onClick={() => setActiveTab("playerStats")}
          >
            Player Stats
          </button>
          <button
            className="team-btns"
            onClick={() => setActiveTab("teamStats")}
          >
            Team Stats
          </button>
        </div>
        {!leagueWide && tab === "roster" && (
          <TeamRoster roster={roster} selectedYear={selectedYear} />
        )}
        {tab === "playerStats" && (
          <TeamPlayersTable players={players} selectedYear={selectedYear} />
        )}
        {tab === "teamStats" && (
          <TeamStatsSummary teamStats={teamStats} selectedYear={selectedYear} />
        )}
      </div>
    </div>
  );
}
