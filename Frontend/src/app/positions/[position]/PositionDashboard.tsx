"use client";

import { useState } from "react";
import TeamPlayersTable, { Player } from "@/app/players/[team]/TeamPlayersTable";

export default function PositionDashboard({
  players,
  years,
  defaultYear,
}: {
  players: Player[];
  years: string[];
  defaultYear: string;
}) {
  const [selectedYear, setSelectedYear] = useState(defaultYear);
  const yearsDescending = [...years].reverse();

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
        <TeamPlayersTable players={players} selectedYear={selectedYear} />
      </div>
    </div>
  );
}
