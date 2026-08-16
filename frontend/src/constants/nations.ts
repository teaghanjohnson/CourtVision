export type CountryAbbrev =
  | "ANG"
  | "AUS"
  | "AUT"
  | "BAH"
  | "BIH"
  | "BRA"
  | "CAN"
  | "CMR"
  | "COD"
  | "CRO"
  | "CZE"
  | "DOM"
  | "EGY"
  | "FRA"
  | "GBR"
  | "GEO"
  | "GER"
  | "GRE"
  | "GUI"
  | "ISR"
  | "ITA"
  | "JAM"
  | "JPN"
  | "KOR"
  | "LAT"
  | "LTU"
  | "MLI"
  | "MNE"
  | "NGR"
  | "NZL"
  | "PUR"
  | "SEN"
  | "SLO"
  | "SRB"
  | "SSD"
  | "SUD"
  | "SUI"
  | "ESP"
  | "TUR"
  | "UKR"
  | "USA";

export const COUNTRY_MAP: Record<string, CountryAbbrev> = {
  Angola: "ANG",
  Australia: "AUS",
  Austria: "AUT",
  Bahamas: "BAH",
  "Bosnia and Herzegovina": "BIH",
  Brazil: "BRA",
  Cameroon: "CMR",
  Canada: "CAN",
  Croatia: "CRO",
  "Czech Republic": "CZE",
  "DR Congo": "COD",
  "Dominican Republic": "DOM",
  Egypt: "EGY",
  France: "FRA",
  Georgia: "GEO",
  Germany: "GER",
  Greece: "GRE",
  Guinea: "GUI",
  Israel: "ISR",
  Italy: "ITA",
  Jamaica: "JAM",
  Japan: "JPN",
  Latvia: "LAT",
  Lithuania: "LTU",
  Mali: "MLI",
  Montenegro: "MNE",
  "New Zealand": "NZL",
  Nigeria: "NGR",
  "Puerto Rico": "PUR",
  Senegal: "SEN",
  Serbia: "SRB",
  Slovenia: "SLO",
  "South Korea": "KOR",
  "South Sudan": "SSD",
  Spain: "ESP",
  Sudan: "SUD",
  Switzerland: "SUI",
  Turkey: "TUR",
  Ukraine: "UKR",
  "United Kingdom": "GBR",
  "United States": "USA",
};

export function getCountryLogo(abbrev: string): string {
  return `/images/${abbrev}.png`;
}
