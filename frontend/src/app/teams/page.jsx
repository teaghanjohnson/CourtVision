import { getTeamLogo, TEAM_MAP } from "@/constants/teamColors";
import Image from "next/image";

export default function teamGrid() {
  const abbreviations = Object.values(TEAM_MAP);
  const teamCells = abbreviations.map((team_abbrev) => (
    <Image
      key={team_abbrev}
      src={getTeamLogo(team_abbrev)}
      alt={team_abbrev}
      width={100}
      height={100}
    />
  ));

  return (
    <>
      <div className="grid grid-cols-3 grid-rows-10">{teamCells}</div>
    </>
  );
}
