"use client";

import { useState } from "react";

export type Player = {
  playerId: number;
  firstName: string;
  lastName: string;
  uniformNumber: string;
  positionCode: string;
  nationality: string;
  gamesPlayed: number;
  dateOfBirth: string;
  teamCode: string;
};

export type Column = {
  key: keyof Player | "name" | "age";
  label: string;
};

const POSITION_ORDER = ["PG", "G", "SG", "SF", "F", "PF", "C"];

export const COLUMNS: Column[] = [
  { key: "uniformNumber", label: "#" },
  { key: "name", label: "Player" },
  { key: "positionCode", label: "Pos" },
  { key: "nationality", label: "Nat" },
  { key: "gamesPlayed", label: "GP" },
  { key: "age", label: "Age" },
];

const fullName = (p: Player) => `${p.firstName} ${p.lastName}`;

const ageOn = (dateOfBirth: string, on = new Date("2024-08-10")) => {
  const dob = new Date(dateOfBirth);
  let age = on.getFullYear() - dob.getFullYear();
  const m = on.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && on.getDate() < dob.getDate())) age -= 1;
  return age;
};

const cellValue = (player: Player, key: Column["key"]) => {
  if (key === "name") return fullName(player);
  if (key === "age") return ageOn(player.dateOfBirth);
  return player[key];
};

export default function NationPlayersTable({ players }: { players: Player[] }) {
  const [sortColumn, setSortColumn] = useState<Column["key"]>("uniformNumber");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (key: Column["key"]) => {
    if (key === sortColumn) {
      setSortDirection(sortDirection === "desc" ? "asc" : "desc");
    } else {
      setSortColumn(key);
      setSortDirection(
        key === "name" || key === "positionCode" ? "asc" : "desc",
      );
    }
  };

  const sortedPlayers = [...players].sort((a, b) => {
    if (sortColumn === "positionCode") {
      const cmp =
        POSITION_ORDER.indexOf(a.positionCode) -
        POSITION_ORDER.indexOf(b.positionCode);
      return sortDirection === "desc" ? -cmp : cmp;
    }

    const aVal = cellValue(a, sortColumn);
    const bVal = cellValue(b, sortColumn);

    if (sortColumn === "uniformNumber") {
      const cmp = Number(aVal) - Number(bVal);
      return sortDirection === "desc" ? -cmp : cmp;
    }

    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortDirection === "desc" ? bVal - aVal : aVal - bVal;
    }

    const cmp = String(aVal).localeCompare(String(bVal));
    return sortDirection === "desc" ? -cmp : cmp;
  });

  return (
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
        {sortedPlayers.map((player) => (
          <tr key={player.playerId}>
            {COLUMNS.map((col) => (
              <td key={col.key} className="px-2 py-1">
                {String(cellValue(player, col.key))}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
