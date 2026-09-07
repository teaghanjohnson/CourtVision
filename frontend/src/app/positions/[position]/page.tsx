import TeamPlayersTable, {Player} from "@/app/players/[team]/TeamPlayersTable";{ Player } from "@/app/players/[team]/TeamPlayersTable";
import { POSITION_MAP } from "@/constants/positions";
export default async function PlayerPositionPage({
  params,
}: {
  params: Promise<{ position: string }>;
}) {
  const { position } = await params;
  const allPos = Object.entries(POSITION_MAP).find(
    ([, abbrev]) => abbrev === position,
  )?.[0];
  let players: Player[];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/player`);

    if (!res.ok) {
      return "cannot load players";
    }
    players = await res.json();
  } catch {
    return "cannot load players";
  }

  const positionPlayers = players.filter((p) => p.position === position);
  const years = Array.from(new Set(positionPlayers.map((p) => p.year))).sort();
  const defaultYear = years[years.length - 1];

  return (
    <>
      <PositionDashboard
        players={positionPlayers}
        years={years}
        defaultYear={defaultYear}
      />
    </>
  );
}
