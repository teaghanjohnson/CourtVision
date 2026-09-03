"use client";

import { getTeamLogo, TEAM_MAP } from "@/constants/teamColors";
import Image from "next/image";
import Sidebar from "@/components/Sidebar/Sidebar";
import Link from "next/link";
import { useState } from "react";

export default function teamGrid() {
  const [search, setSearch] = useState("");
  const teamEntries = Object.entries(TEAM_MAP);
  const visibleTeamEntries = search
    ? teamEntries.filter(([teamName]) =>
        teamName.toLowerCase().includes(search.toLowerCase()),
      )
    : teamEntries;
  const teamCells = visibleTeamEntries.map(([teamName, team_abbrev]) => (
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
      <div className="absolute inset-x-0 bottom-0 z-2 h-[10px] bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
      <div
        className="absolute inset-x-0 bottom-0 z-3 flex items-center justify-between p-[15px_20px] drop-shadow-black
translate-y-full group-hover:translate-y-0
transition-transform duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)]"
      >
        <span
          className="text-white text-lg font-normal opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            fontFamily:
              'var(--font-dm-sans), "DM Sans Placeholder", sans-serif',
          }}
        >
          {teamName}
        </span>
        <button
          className="text-center text-white text-[11px] font-bold tracking-[4px] no-underline py-[6px] px-[14px] rounded-[7px] bg-[#5faceb] whitespace-nowrap transition-all duration-300 ease-in-out hover:bg-white hover:text-[#5faceb]"
          style={{
            fontFamily:
              'var(--font-dm-sans), "DM Sans Placeholder", sans-serif',
          }}
        >
          Enter
        </button>
      </div>
    </Link>
  ));

  return (
    <>
      <Sidebar />
      <div className="pl-30 pr-30 w-full h-full">
        <div className="flex flex-col items-left justify-between mt-[120px]">
          <div
            style={{
              fontFamily: "var(--font-libre-baskerville), serif",
              color: "white",
              fontStyle: "italic",
              fontSize: "50px",
              fontFeatureSettings: '"dlig" on, "frac" on, "sups" on, "sinf" on',
            }}
          >
            TEAMS
          </div>
          <input
            type="text"
            name="searchBar"
            className="w-[500px] mt-10 px-6 py-1 text-[16px] text-black bg-white rounded-full shadow-md border border-gray-200 outline-none focus:ring-2 focus:ring-[#5faceb]"
            placeholder="Search for teams"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="mt-30 mb-30 grid grid-cols-4 gap-25 pb-100">
          {teamCells}
        </div>
      </div>
    </>
  );
}
