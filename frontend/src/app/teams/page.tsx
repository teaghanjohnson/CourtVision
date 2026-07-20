import { getTeamLogo, TEAM_MAP } from "@/constants/teamColors";
import Image from "next/image";
import Link from "next/link";

export default function teamGrid() {
  const teamEntries = Object.entries(TEAM_MAP);
  const teamCells = teamEntries.map(([teamName, team_abbrev]) => (
    <Link
      key={team_abbrev}
      href={`players/${team_abbrev}`}
      className="group relative block w-full h-[450px] overflow-hidden rounded-[10px] bg-transparent shadow-lg"
    >
      <Image
        src={getTeamLogo(team_abbrev)}
        alt={team_abbrev}
        fill
        loading="eager"
        sizes="33vw"
        className="z-2 object-contain object-center p-14"
      />
      <div className="absolute inset-x-0 bottom-0 flex justify-center py-2 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-white text-lg font-semibold">{teamName}</span>
      </div>
    </Link>
  ));

  return (
    <>
      <div className="mt-20 grid grid-cols-3 grid-rows-10 gap-15 flex-wrap pb-100 ">
        {teamCells}
      </div>
    </>
  );
}
