import { getTeamLogo, TEAM_MAP } from "@/constants/teamColors";
import Image from "next/image";
import { Player } from "./TeamPlayersTable";
import Sidebar from "@/components/Sidebar/Sidebar";
import TeamDashboard from "./TeamDashboard";
import { Team } from "./TeamStatsSummary";
import { RosterEntry } from "./TeamRoster";

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
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/player?team=${team}`,
    );

    if (!res.ok) {
      return "cannot load players";
    }
    players = await res.json();
  } catch {
    return "cannot load players";
  }

  const years = Array.from(new Set(players.map((p) => p.year))).sort();

  let teamStats: Team[];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/team?team=${team}`,
    );
    if (!res.ok) {
      return "cannot load team stats";
    }
    teamStats = await res.json();
  } catch {
    return "cannot load team stats";
  }

  let roster: RosterEntry[];
  try {
    const responses = await Promise.all(
      years.map((year) =>
        fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/roster?team=${team}&year=${year}`,
        ),
      ),
    );
    const rosterArrays = await Promise.all(responses.map((r) => r.json()));
    roster = rosterArrays.flat();
  } catch {
    return "cannot load roster";
  }

  const defaultYear = years[years.length - 1];

  return (
    <>
      <Sidebar />
      <div className="flex items-center gap-25 mt-30">
        <Image src={getTeamLogo(team)} alt={team} width={80} height={80} />
        <h1 className="text-2xl font-semibold">{teamName}</h1>
      </div>
      <TeamDashboard
        players={players}
        teamStats={teamStats}
        roster={roster}
        years={years}
        defaultYear={defaultYear}
      />
    </>
  );
}
