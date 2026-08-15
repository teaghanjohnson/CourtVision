export type CountryAbbrev =
  | "AUS"
  | "BRA"
  | "CAN"
  | "FRA"
  | "GER"
  | "GRE"
  | "JPN"
  | "PUR"
  | "SRB"
  | "SSD"
  | "ESP"
  | "USA";

export const COUNTRY_MAP: Record<string, CountryAbbrev> = {
  Australia: "AUS",
  Brazil: "BRA",
  Canada: "CAN",
  France: "FRA",
  Germany: "GER",
  Greece: "JPN",
  "Puerto Rico": "PUR",
  Serbia: "SRB",
  "South Sudan": "SSD",
  Spain: "ESP",
  "United States": "USA",
};

export function getCountryLogo(abbrev: String): string {
  return `/images/${abbrev}.png`;
}
