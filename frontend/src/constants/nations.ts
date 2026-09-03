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
  Greece: "GRE",
  Japan: "JPN",
  "Puerto Rico": "PUR",
  Serbia: "SRB",
  "South Sudan": "SSD",
  Spain: "ESP",
  "United States": "USA",
};

export function getCountryLogo(abbrev: string): string {
  return `/images/NATIONS/${abbrev}.png`;
}
