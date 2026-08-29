"use client";

import { useState } from "react";

export type Player = {
  playerId: string;
  player: string;
  year: string;
  team: string;
  position: string;
  ppg: number;
  orpg: number;
  rpg: number;
  apg: number;
  spg: number;
  bpg: number;
  topg: number;
  mpg: number;
  fpg: number;
  fgPct: number | null;
  fg3Pct: number | null;
  ftPct: number | null;
  pts: number;
  reb: number;
  ast: number;
  stl: number;
  blk: number;
  tov: number;
  fgm: number;
  fga: number;
  fg3m: number;
  fg3a: number;
  ftm: number;
  fta: number;
  mins: number;
  fls: number;
  g: number;
  gs: number;
  td: number;
};

export type Column = {
  key: keyof Player;
  label: string;
};

const POSITION_ORDER = ["PG", "SG", "SF", "PF", "C"];

export const COLUMNS: Column[] = [
  { key: "player", label: "Player" },
  { key: "position", label: "Pos" },
  { key: "team", label: "Team" },
  { key: "g", label: "G" },
  { key: "gs", label: "GS" },
  { key: "mpg", label: "MPG" },
  { key: "ppg", label: "PPG" },
  { key: "rpg", label: "RPG" },
  { key: "orpg", label: "ORPG" },
  { key: "apg", label: "APG" },
  { key: "spg", label: "SPG" },
  { key: "bpg", label: "BPG" },
  { key: "topg", label: "TOPG" },
  { key: "fpg", label: "FPG" },
  { key: "fgm", label: "FGM" },
  { key: "fga", label: "FGA" },
  { key: "fgPct", label: "FG%" },
  { key: "fg3m", label: "3PM" },
  { key: "fg3a", label: "3PA" },
  { key: "fg3Pct", label: "3P%" },
  { key: "ftm", label: "FTM" },
  { key: "fta", label: "FTA" },
  { key: "ftPct", label: "FT%" },
  { key: "pts", label: "PTS" },
  { key: "reb", label: "REB" },
  { key: "ast", label: "AST" },
  { key: "stl", label: "STL" },
  { key: "blk", label: "BLK" },
  { key: "tov", label: "TOV" },
  { key: "td", label: "TD" },
];

export default function TeamPlayersTable({
  players,
  selectedYear,
}: {
  players: Player[];
  selectedYear: string;
}) {
  const [sortColumn, setSortColumn] = useState<keyof Player>("ppg");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const filteredPlayers = players.filter((p) => p.year === selectedYear);

  const handleSort = (key: keyof Player) => {
    if (key === sortColumn) {
      setSortDirection(sortDirection === "desc" ? "asc" : "desc");
    } else {
      setSortColumn(key);
      setSortDirection("desc");
    }
  };

  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    const aVal = a[sortColumn];
    const bVal = b[sortColumn];

    if (aVal == null) return 1;
    if (bVal == null) return -1;

    if (sortColumn === "position") {
      const aIndex = POSITION_ORDER.indexOf(String(aVal));
      const bIndex = POSITION_ORDER.indexOf(String(bVal));
      return sortDirection === "desc" ? aIndex - bIndex : bIndex - aIndex;
    }

    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortDirection === "desc" ? bVal - aVal : aVal - bVal;
    }

    const cmp = String(aVal).localeCompare(String(bVal));
    return sortDirection === "desc" ? -cmp : cmp;
  });

  return (
    <table className="min-w-full text-sm">
      <thead>
        <tr>
          {COLUMNS.map((col) => (
            <th
              key={col.key}
              onClick={() => handleSort(col.key)}
              className="px-2 py-1 text-left font-semibold cursor-pointer"
            >
              {col.label}
              {col.key === sortColumn && (
                <span className="ml-1">
                  {sortDirection === "desc" ? "▼" : "▲"}
                </span>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedPlayers.map((player) => (
          <tr key={player.playerId}>
            {COLUMNS.map((col) => (
              <td key={col.key} className="px-2 py-1">
                {player[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
