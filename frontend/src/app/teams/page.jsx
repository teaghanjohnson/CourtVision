import { getTeamLogo, TEAM_MAP } from "@/constants/teamColors";
import Image from "next/image";
import Link from "next/link";
export default function teamGrid() {
  const abbreviations = Object.values(TEAM_MAP);
  const teamCells = abbreviations.map((team_abbrev) => (
    <Link key={team_abbrev} href={`players/${team_abbrev}`}>
      <Image
        src={getTeamLogo(team_abbrev)}
        alt={team_abbrev}
        width={100}
        height={100}
      />
    </Link>
  ));

  return (
    <>
      <div className="grid grid-cols-3 grid-rows-10">{teamCells}</div>
    </>
  );
}
