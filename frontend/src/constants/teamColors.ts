// NBA team color palettes: [primary, secondary, tertiary]
export type TeamAbbrev =
  | "NBA"
  | "ATL"
  | "BOS"
  | "BRK"
  | "CHO"
  | "CHI"
  | "CLE"
  | "DAL"
  | "DEN"
  | "DET"
  | "GSW"
  | "HOU"
  | "IND"
  | "LAC"
  | "LAL"
  | "MEM"
  | "MIA"
  | "MIL"
  | "MIN"
  | "NOP"
  | "NYK"
  | "OKC"
  | "ORL"
  | "PHI"
  | "PHO"
  | "POR"
  | "SAC"
  | "SAS"
  | "TOR"
  | "UTA"
  | "WAS";

export type TeamColorTriple = [primary: string, secondary: string, tertiary: string];

// Ported from nba-match-predictor/utils/constants/constants.py
export const TEAM_COLORS: Record<TeamAbbrev, TeamColorTriple> = {
  NBA: ["#17408B", "#C9082A", "#FFFFFF"], // NBA Default: Blue, Red, White
  ATL: ["#c8102e", "#ffcd00", "#FFFFFF"], // Hawks: Red, Volt Green, Charcoal
  BOS: ["#007A33", "#BA9653", "#000000"], // Celtics: Green, Gold, Black
  BRK: ["#000000", "#FFFFFF", "#707271"], // Nets: Black, White, Gray
  CHO: ["#1D1160", "#00788C", "#A1A1A4"], // Hornets: Purple, Teal, Gray
  CHI: ["#CE1141", "#000000", "#FFFFFF"], // Bulls: Red, Black, White
  CLE: ["#860038", "#041e42", "#fdbb30"], // Cavaliers: Wine, Gold, Navy
  DAL: ["#00538C", "#002F5F", "#B8C4CA"], // Mavericks: Blue, Navy, Silver
  DEN: ["#0E2240", "#FEC524", "#8B2131"], // Nuggets: Navy, Gold, Red
  DET: ["#C8102E", "#1D42BA", "#BEC0C2"], // Pistons: Red, Blue, Gray
  GSW: ["#1D428A", "#FFC72C", "#26282A"], // Warriors: Blue, Gold, Charcoal
  HOU: ["#CE1141", "#000000", "#C4CED4"], // Rockets: Red, Black, Silver
  IND: ["#002D62", "#FDBB30", "#BEC0C2"], // Pacers: Navy, Gold, Gray
  LAC: ["#C8102E", "#1D428A", "#BEC0C2"], // Clippers: Red, Blue, Gray
  LAL: ["#552583", "#FDB927", "#000000"], // Lakers: Purple, Gold, Black
  MEM: ["#5D76A9", "#12173F", "#F5B112"], // Grizzlies: Blue, Navy, Yellow
  MIA: ["#98002E", "#F9A01B", "#000000"], // Heat: Red, Yellow, Black
  MIL: ["#00471B", "#EEE1C6", "#0077C0"], // Bucks: Green, Cream, Blue
  MIN: ["#0C2340", "#236192", "#9EA2A2"], // Timberwolves: Navy, Blue, Gray
  NOP: ["#0C2340", "#C8102E", "#85714D"], // Pelicans: Navy, Red, Gold
  NYK: ["#006BB6", "#F58426", "#BEC0C2"], // Knicks: Blue, Orange, Silver
  OKC: ["#007ac1", "#ef3b24", "#fdbb30"], // Thunder: Blue, Orange, Navy
  ORL: ["#0077C0", "#000000", "#C4CED4"], // Magic: Blue, Black, Silver
  PHI: ["#006BB6", "#ED174C", "#002B5C"], // 76ers: Blue, Red, Navy
  PHO: ["#E56020", "#1D1160", "#000000"], // Suns: Orange, Purple, Black
  POR: ["#E03A3E", "#000000", "#FFFFFF"], // Blazers: Red, Black, White
  SAC: ["#5A2D81", "#63727A", "#000000"], // Kings: Purple, Gray, Black
  SAS: ["#000000", "#C4CED4", "#FFFFFF"], // Spurs: Black, Silver, White
  TOR: ["#CE1141", "#000000", "#A1A1A4"], // Raptors: Red, Black, Gray
  UTA: ["#002B5C", "#00471B", "#F9A01B"], // Jazz: Navy, Green, Yellow
  WAS: ["#002B5C", "#E31837", "#C4CED4"], // Wizards: Navy, Red, Silver
};

// League-wide theme, used for chrome/UI that isn't team-specific
export const THEME: {
  primary: string;
  background: string;
  secondaryBg: string;
  text: string;
  success: string;
  error: string;
} = {
  primary: "#C9082A", // nba red
  background: "#17408B", // nba blue
  secondaryBg: "#1D4F91", // lighter blue
  text: "#FFFFFF", // white
  success: "#2E7D32", // green
  error: "#C62828", // red
};

// Full team name -> abbreviation, matches the logo filenames in /public/images
export const TEAM_MAP: Record<string, TeamAbbrev> = {
  "Atlanta Hawks": "ATL",
  "Boston Celtics": "BOS",
  "Brooklyn Nets": "BRK",
  "Charlotte Hornets": "CHO",
  "Chicago Bulls": "CHI",
  "Cleveland Cavaliers": "CLE",
  "Dallas Mavericks": "DAL",
  "Denver Nuggets": "DEN",
  "Detroit Pistons": "DET",
  "Golden State Warriors": "GSW",
  "Houston Rockets": "HOU",
  "Indiana Pacers": "IND",
  "Los Angeles Clippers": "LAC",
  "Los Angeles Lakers": "LAL",
  "Memphis Grizzlies": "MEM",
  "Miami Heat": "MIA",
  "Milwaukee Bucks": "MIL",
  "Minnesota Timberwolves": "MIN",
  "New Orleans Pelicans": "NOP",
  "New York Knicks": "NYK",
  "Oklahoma City Thunder": "OKC",
  "Orlando Magic": "ORL",
  "Philadelphia 76ers": "PHI",
  "Phoenix Suns": "PHO",
  "Portland Trail Blazers": "POR",
  "Sacramento Kings": "SAC",
  "San Antonio Spurs": "SAS",
  "Toronto Raptors": "TOR",
  "Utah Jazz": "UTA",
  "Washington Wizards": "WAS",
};

// Path to a team's logo in /public/images/NBA (e.g. getTeamLogo('LAL') -> "/images/NBA/LAL.png")
export function getTeamLogo(abbrev: string): string {
  return `/images/NBA/${abbrev}.png`;
}

// [primary, secondary, tertiary] hex colors for a team abbreviation
export function getTeamColors(abbrev: TeamAbbrev): TeamColorTriple {
  return TEAM_COLORS[abbrev] ?? TEAM_COLORS.NBA;
}
