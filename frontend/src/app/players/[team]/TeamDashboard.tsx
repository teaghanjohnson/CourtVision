"use client";

import { useState } from "react";
import { Player } from "./TeamPlayersTable";
import { RosterEntry } from "./TeamRoster";
import { Team } from "./TeamStatsSummary";

const activeTab = useState<"roster" | "playerStats" | "teamStats">(
  "playerStats",
);
export function TeamDashboar({ activeTab }) {
  const [selectedYear, setSelectedYear] = useState(defaultYear);

  return <></>;
}
