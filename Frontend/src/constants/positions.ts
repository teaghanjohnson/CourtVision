export type Positions =
  | "Point Guards"
  | "Shooting Guards"
  | "Small Forwards"
  | "Power Forwards"
  | "Centers";

export type PositionAbbrev = "PG" | "SG" | "SF" | "PF" | "C";

export const POSITION_MAP: Record<Positions, PositionAbbrev> = {
  "Point Guards": "PG",
  "Shooting Guards": "SG",
  "Small Forwards": "SF",
  "Power Forwards": "PF",
  Centers: "C",
};

export function getPositionLogo(abbrev: PositionAbbrev): string {
  return `/images/POSITIONS/${abbrev}.png`;
}
