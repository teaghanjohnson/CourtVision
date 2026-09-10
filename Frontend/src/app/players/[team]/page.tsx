import { getTeamLogo, TEAM_MAP } from "@/constants/teamColors";
import Image from "next/image";
import AnimatedHeader from "@/components/AnimatedLetters/AnimatedHeader";
import { Player } from "./TeamPlayersTable";

import TeamDashboard from "./TeamDashboard";
import { Team } from "./TeamStatsSummary";
import { RosterEntry } from "./TeamRoster";

// Force this dynamic route to fetch fresh data on every request
export const dynamic = "force-dynamic";

export default async function TeamPlayersPage({
  params,
}: {
  params: Promise<{ team: string }>;
}) {
  const { team } = await params;
  const isLeague = team === "NBA";
  const teamName = isLeague
    ? "NBA"
    : Object.entries(TEAM_MAP).find(([, abbrev]) => abbrev === team)?.[0];

  let players: Player[];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/player${isLeague ? "" : `?team=${team}`}`,
    );

    if (!res.ok) {
      return "cannot load players";
    }
    players = await res.json();
  } catch {
    return "cannot load players";
  }

  const years = Array.from(new Set(players.map((p) => p.year))).sort();
  const defaultYear = years[years.length - 1];

  let teamStats: Team[];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/team${isLeague ? "" : `?team=${team}`}`,
    );
    if (!res.ok) {
      return "cannot load team stats";
    }
    teamStats = await res.json();
  } catch {
    return "cannot load team stats";
  }

  let roster: RosterEntry[] = [];
  if (!isLeague) {
    try {
      const responses = await Promise.all(
        years.map((year) =>
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/roster?team=${team}&year=${year}`,
          ),
        ),
      );
      roster = (await Promise.all(responses.map((r) => r.json()))).flat();
    } catch {
      return "cannot load roster";
    }
  }

  return (
    <>
      <div className="flex items-center gap-25 mt-30 ml-10 mb-10">
        <Image src={getTeamLogo(team)} alt={team} width={80} height={80} />
        <h1
          className="text-2xl font-semibold text-white"
          style={{
            fontFamily: "var(--font-libre-baskerville), serif",
            fontStyle: "italic",
            fontFeatureSettings: '"dlig" on, "frac" on, "sups" on, "sinf" on',
          }}
        >
          <AnimatedHeader text={teamName ?? team} />
        </h1>
      </div>
      <TeamDashboard
        players={players}
        teamStats={teamStats}
        roster={roster}
        years={years}
        defaultYear={defaultYear}
        leagueWide={isLeague}
      />
    </>
  );
}
