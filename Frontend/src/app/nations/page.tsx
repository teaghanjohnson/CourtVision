"use client";

import { getCountryLogo, COUNTRY_MAP } from "@/constants/nations";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AnimatedHeader from "@/components/AnimatedLetters/AnimatedHeader";

export default function nationGrid() {
  const [search, setSearch] = useState("");
  const nationEntries = Object.entries(COUNTRY_MAP);
  const visibleNationEntries = search
    ? nationEntries.filter(([nationName]) =>
        nationName.toLowerCase().includes(search.toLowerCase()),
      )
    : nationEntries;
  const nationCells = visibleNationEntries.map(
    ([nationName, nation_abbrev], index) => (
      <Link
        key={nation_abbrev}
        href={`nations/${nation_abbrev}`}
        className="group relative h-[300px] overflow-hidden rounded-[15px] card-enter"
        style={{ animationDelay: `${(index + 1) / 3}s` }}
      >
        <Image
          src={getCountryLogo(nation_abbrev)}
          alt={nation_abbrev}
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
          <span
            className="text-white text-lg font-normal opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              fontFamily:
                'var(--font-dm-sans), "DM Sans Placeholder", sans-serif',
            }}
          >
            {nationName}
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
    ),
  );

  return (
    <>
      <div className="pl-10 pr-10 w-full h-full">
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
            <AnimatedHeader text="NATIONS" idx={6} />
          </div>
          <input
            type="text"
            name="searchBar"
            className="w-[500px] mt-10 px-6 py-1 text-[16px] text-black bg-white rounded-full shadow-md border border-gray-200 outline-none focus:ring-2 focus:ring-[#5faceb] search-bar-fade"
            placeholder="Search for nations"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="mt-30 mb-30 grid grid-cols-4 gap-25 pb-100">
          {nationCells}
        </div>
      </div>
    </>
  );
}
