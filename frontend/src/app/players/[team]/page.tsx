import { getTeamLogo, TEAM_MAP } from "@/constants/teamColors";
import Image from "next/image";
import TeamPlayersTable, { Player } from "./TeamPlayersTable";
import Sidebar from "@/components/Sidebar/Sidebar";
export default async function TeamPlayersPage({
  params,
}: {
  params: Promise<{ team: string }>;
}) {
  const { team } = await params;
  const teamName = Object.entries(TEAM_MAP).find(
    ([, abbrev]) => abbrev === team,
  )?.[0];

  let players: Player[];
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/player?team=${team}`;
    const response = await fetch(url);
    if (!response.ok) {
      return "cannot load players";
    }
    players = await response.json();
  } catch {
    return "cannot load players";
  }

  const years = Array.from(new Set(players.map((p) => p.year))).sort();
  const defaultYear = years[years.length - 1];

  return (
    <>
      <Sidebar />
      <div className="flex items-center gap-4 mt-10">
        <Image src={getTeamLogo(team)} alt={team} width={80} height={80} />
        <h1 className="text-2xl font-semibold">{teamName}</h1>
      </div>
      <TeamPlayersTable
        players={players}
        years={years}
        defaultYear={defaultYear}
      />
    </>
  );
}
