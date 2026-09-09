"use client";

import { useState } from "react";
import { div } from "three/src/nodes/math/OperatorNode.js";

export type RosterEntry = {
  playerId: string;
  team: string;
  year: string;

  player: string;
  nickname: string | null;
  playerSlug: string;
  num: string;
  position: string;
  height: string;
  weight: number | null;
  birthDate: string | null;
  age: number | null;
  exp: string;
  school: string | null;
  howAcquired: string | null;
};

export type Column = {
  key: keyof RosterEntry;
  label: string;
};

export const COLUMNS: Column[] = [
  { key: "player", label: "Player" },
  { key: "num", label: "#" },
  { key: "position", label: "Pos" },
  { key: "height", label: "Height" },
  { key: "weight", label: "Weight" },
  { key: "age", label: "Age" },
  { key: "exp", label: "Exp" },
  { key: "school", label: "School" },
];

function setSeasonAge(birthDate: string | null, year: string): number | null {
  if (!birthDate) {
    return null;
  }

  const [by, bm, bd] = birthDate.split("-").map(Number);
  const endYy = Number(year.split("-")[1]);

  if ([by, bm, bd, endYy].some((n) => Number.isNaN(n))) return null;

  const asOfYear = 2000 + endYy;
  const birthdayReached = bm < 2 || (bm === 2 && bd <= 1);
  return asOfYear - by - (birthdayReached ? 0 : 1);
}

export default function TeamRoster({
  roster,
  selectedYear,
}: {
  roster: RosterEntry[];
  selectedYear: string;
}) {
  const [sortColumn, setSortColumn] = useState<keyof RosterEntry>("player");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (key: keyof RosterEntry) => {
    if (key === sortColumn) {
      setSortDirection(sortDirection === "desc" ? "asc" : "desc");
    } else {
      setSortColumn(key);
      setSortDirection("desc");
    }
  };

  const filteredRoster = roster
    .filter((r) => r.year === selectedYear)
    .map((r) => ({ ...r, age: setSeasonAge(r.birthDate, r.year) }));

  const sortedRoster = [...filteredRoster].sort((a, b) => {
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
    <>
      <div className="flex flex-col items-center gap-10 mt-10 pb-40">
        <table className="content-table">
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
            {sortedRoster.map((r) => (
              <tr key={r.playerId}>
                {COLUMNS.map((col) => (
                  <td key={col.key} className="px-2 py-1">
                    {r[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
