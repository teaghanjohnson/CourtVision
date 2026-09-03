import Image from "next/image";
import allPlayers from "@/data/olympics-2024/players.json";
import { COUNTRY_MAP, getCountryLogo } from "@/constants/nations";
import NationPlayersTable, { Player } from "./NationPlayersTable";

export default async function NationsPlayerPage({
  params,
}: {
  params: Promise<{ nations: string }>;
}) {
  const { nations } = await params;
  const nationName = Object.entries(COUNTRY_MAP).find(
    ([, abbrev]) => abbrev === nations,
  )?.[0];

  const players: Player[] = (allPlayers as Player[]).filter(
    (p) => p.teamCode === nations,
  );

  if (!nationName || players.length === 0) {
    return "no roster for this nation";
  }

  return (
    <>
      <div className="flex items-center gap-25 mt-30">
        <Image
          src={getCountryLogo(nations)}
          alt={nations}
          width={80}
          height={80}
        />
        <h1 className="text-2xl font-semibold">{nationName}</h1>
      </div>
      <NationPlayersTable players={players} />
    </>
  );
}
