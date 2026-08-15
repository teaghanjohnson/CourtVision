"use client";

import { getTeamLogo, TEAM_MAP } from "@/constants/teamColors";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function teamGrid() {
  const [search, setSearch] = useState("");
  const teamEntries = Object.entries(TEAM_MAP);
  const suggestions = search
    ? teamEntries.filter(([teamName]) =>
        teamName.toLowerCase().includes(search.toLowerCase()),
      )
    : [];
  const teamCells = teamEntries.map(([teamName, team_abbrev]) => (
    <Link
      key={team_abbrev}
      href={`players/${team_abbrev}`}
      className="group relative h-[300px] overflow-hidden rounded-[15px]"
    >
      <Image
        src={getTeamLogo(team_abbrev)}
        alt={team_abbrev}
        fill
        loading="eager"
        sizes="33vw"
        className="absolute z-2 w-full h-full object-cover"
      />
      <div className="absolute inset-0 z-2 bg-gradient-to-b from-white to-black opacity-0 transition-all duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)] group-hover:opacity-[0.35]" />
      <div
        className="absolute inset-x-0 bottom-0 z-3 flex items-center justify-between p-[15px_20px]
translate-y-full group-hover:translate-y-0
transition-transform duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)]"
      >
        <span className="text-white text-lg font-normal opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {teamName}
        </span>
        <button className="text-center text-white text-[11px] font-bold tracking-[4px] font-sans no-underline py-[6px] px-[14px] rounded-[7px] bg-[#5faceb] whitespace-nowrap transition-all duration-300 ease-in-out hover:bg-white hover:text-[#5faceb]">
          Enter
        </button>
      </div>
    </Link>
  ));

  return (
    <>
      <div className="pl-10 pr-10 w-full h-full">
        <div className="text-white text-4xl mt-35">TEAMS</div>
        <div className="flex-col items-center">
          <input
            type="text"
            name="searchBar"
            className="p-10 w-[300px] text-[16px]"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <ul className="w-[300px] max-h-[150px] overflow-y-auto mt-[4px] p-0 bg-white">
            {suggestions.map(([teamName, team_abbrev]) => (
              <li
                key={team_abbrev}
                className="flex justify-between items-center p-[14px 20px]"
              >
                <Link href={`players/${team_abbrev}`}>{teamName}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-30 mb-30 grid grid-cols-3 gap-25 pb-100">
          {teamCells}
        </div>
      </div>
    </>
  );
}
