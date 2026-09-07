"use client";
import { useState } from "react";

export type Team = {
  teamId: string;
  teamName: string;
  year: string;
  team: string;
  w: number;
  l: number;
  fgm: number;
  fga: number;
  fg3m: number;
  fg3a: number;
  ftm: number;
  fta: number;
  oreb: number;
  dreb: number;
  reb: number;
  ast: number;
  tov: number;
  stl: number;
  blk: number;
  blka: number;
  pf: number;
  pfd: number;
  pts: number;
  plusMinus: number;
  offRating: number;
  defRating: number;
  netRating: number;
  astTo: number;
  astRatio: number;
  pace: number;
  pacePer40: number;
  poss: number;
  pie: number;
  oppFgm: number;
  oppFga: number;
  oppFg3m: number;
  oppFg3a: number;
  oppFtm: number;
  oppFta: number;
  oppOreb: number;
  oppDreb: number;
  oppReb: number;
  oppAst: number;
  oppTov: number;
  oppStl: number;
  oppBlk: number;
  oppBlka: number;
  oppPf: number;
  oppPfd: number;
  oppPts: number;

  winPct: number | null;
  fgPct: number | null;
  fg3Pct: number | null;
  ftPct: number | null;
  astPct: number | null;
  orebPct: number | null;
  drebPct: number | null;
  rebPct: number | null;
  tmTovPct: number | null;
  efgPct: number | null;
  tsPct: number | null;
  oppFgPct: number | null;
  oppFg3Pct: number | null;
  oppFtPct: number | null;
};

const AVERAGED_KEYS = new Set<keyof Team>([
  "fgm",
  "fga",
  "fg3m",
  "fg3a",
  "ftm",
  "fta",
  "oreb",
  "dreb",
  "reb",
  "ast",
  "tov",
  "stl",
  "blk",
  "blka",
  "pf",
  "pfd",
  "pts",
  "plusMinus",
  "offRating",
  "defRating",
  "netRating",
  "astTo",
  "astRatio",
  "pace",
  "pacePer40",
  "pie",
  "oppFgm",
  "oppFga",
  "oppFg3m",
  "oppFg3a",
  "oppFtm",
  "oppFta",
  "oppOreb",
  "oppDreb",
  "oppReb",
  "oppAst",
  "oppTov",
  "oppStl",
  "oppBlk",
  "oppBlka",
  "oppPf",
  "oppPfd",
  "oppPts",
]);
export type Column = {
  key: keyof Team;
  label: string;
};

const formatCell = (key: keyof Team, value: Team[keyof Team]) => {
  if (typeof value === "number" && String(key).endsWith("Pct")) {
    return `${(value * 100).toFixed(1)}%`;
  }
  if (
    typeof value === "number" &&
    Number.isInteger(value) &&
    AVERAGED_KEYS.has(key)
  ) {
    return value.toFixed(1);
  }
  return value;
};

export const COLUMNS: Column[] = [
  { key: "teamName", label: "Team" },
  { key: "w", label: "W" },
  { key: "l", label: "L" },
  { key: "winPct", label: "WIN%" },
  { key: "pts", label: "PTS" },
  { key: "fgm", label: "FGM" },
  { key: "fga", label: "FGA" },
  { key: "fgPct", label: "FG%" },
  { key: "fg3m", label: "3PM" },
  { key: "fg3a", label: "3PA" },
  { key: "fg3Pct", label: "3P%" },
  { key: "ftm", label: "FTM" },
  { key: "fta", label: "FTA" },
  { key: "ftPct", label: "FT%" },
  { key: "oreb", label: "OREB" },
  { key: "dreb", label: "DREB" },
  { key: "reb", label: "REB" },
  { key: "ast", label: "AST" },
  { key: "tov", label: "TOV" },
  { key: "stl", label: "STL" },
  { key: "blk", label: "BLK" },
  { key: "pf", label: "PF" },
  { key: "pfd", label: "PFD" },
  { key: "plusMinus", label: "+/-" },
  { key: "offRating", label: "OFF RTG" },
  { key: "defRating", label: "DEF RTG" },
  { key: "netRating", label: "NET RTG" },
  { key: "astTo", label: "AST/TO" },
  { key: "astPct", label: "AST%" },
  { key: "astRatio", label: "AST RATIO" },
  { key: "orebPct", label: "OREB%" },
  { key: "drebPct", label: "DREB%" },
  { key: "rebPct", label: "REB%" },
  { key: "tmTovPct", label: "TOV%" },
  { key: "efgPct", label: "EFG%" },
  { key: "tsPct", label: "TS%" },
  { key: "pace", label: "PACE" },
  { key: "pacePer40", label: "PACE/40" },
  { key: "poss", label: "POSS" },
  { key: "pie", label: "PIE" },
  { key: "oppPts", label: "OPP PTS" },
  { key: "oppFgPct", label: "OPP FG%" },
  { key: "oppFg3m", label: "OPP 3PM" },
  { key: "oppFg3a", label: "OPP 3PA" },
  { key: "oppFg3Pct", label: "OPP 3P%" },
  { key: "oppFtm", label: "OPP FTM" },
  { key: "oppFta", label: "OPP FTA" },
  { key: "oppFtPct", label: "OPP FT%" },
  { key: "oppOreb", label: "OPP OREB" },
  { key: "oppDreb", label: "OPP DREB" },
  { key: "oppReb", label: "OPP REB" },
  { key: "oppAst", label: "OPP AST" },
  { key: "oppTov", label: "OPP TOV" },
  { key: "oppStl", label: "OPP STL" },
  { key: "oppBlk", label: "OPP BLK" },
  { key: "oppBlka", label: "OPP BLKA" },
  { key: "oppPf", label: "OPP PF" },
  { key: "oppPfd", label: "OPP PFD" },
];

export default function TeamStatsSummary({
  teamStats,
  selectedYear,
}: {
  teamStats: Team[];
  selectedYear: string;
}) {
  const [sortColumn, setSortColumn] = useState<keyof Team>("w");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const filteredStats = teamStats.filter((t) => t.year === selectedYear);

  const handleSort = (key: keyof Team) => {
    if (key === sortColumn) {
      setSortDirection(sortDirection === "desc" ? "asc" : "desc");
    } else {
      setSortColumn(key);
      setSortDirection("desc");
    }
  };

  const sortedStats = [...filteredStats].sort((a, b) => {
    const aVal = a[sortColumn];
    const bVal = b[sortColumn];

    if (aVal == null) return 1;
    if (bVal == null) return -1;

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
        {sortedStats.map((team) => (
          <tr key={`${team.teamId}-${team.year}`}>
            {COLUMNS.map((col) => (
              <td key={col.key} className="px-2 py-1">
                {formatCell(col.key, team[col.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
