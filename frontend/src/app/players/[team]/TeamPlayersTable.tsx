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

export const COLUMNS: Column[] = [
  { key: "player", label: "Player" },
  { key: "position", label: "Pos" },
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

export default function TeamPlayersTable() {
  return <></>;
}
