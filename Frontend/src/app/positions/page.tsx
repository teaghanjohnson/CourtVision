"use client";

import { POSITION_MAP, getPositionLogo } from "@/constants/positions";
import Image from "next/image";
import Link from "next/link";
import AnimatedHeader from "@/components/AnimatedLetters/AnimatedHeader";

export default function positionGrid() {
  const positionEntries = Object.entries(POSITION_MAP);
  const positionCells = positionEntries.map(
    ([positionName, positionAbbrev], index) => (
      <Link
        key={positionAbbrev}
        href={`positions/${positionAbbrev}`}
        className={`group relative h-[300px] overflow-hidden rounded-[15px] card-enter col-span-2 ${
          index === 3 ? "col-start-2" : index === 4 ? "col-start-4" : ""
        }`}
        style={{ animationDelay: `${(index + 1) / 3}s` }}
      >
        <Image
          src={getPositionLogo(positionAbbrev)}
          alt={positionAbbrev}
          fill
          loading="eager"
          sizes="33vw"
          className={`absolute z-2 w-full h-full object-cover ${
            positionAbbrev === "PG"
              ? "object-[center_5%]"
              : positionAbbrev === "PF"
                ? "object-[center_10%]"
                : ""
          }`}
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
            {positionName}
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
        <div className="flex items-center justify-between mt-[120px]">
          <div
            style={{
              fontFamily: "var(--font-libre-baskerville), serif",
              color: "white",
              fontStyle: "italic",
              fontSize: "50px",
              fontFeatureSettings: '"dlig" on, "frac" on, "sups" on, "sinf" on',
            }}
          >
            <AnimatedHeader text="POSITIONS" idx={6} />
          </div>
        </div>
        <div className="mt-30 mb-30 grid grid-cols-6 gap-25 pb-100">
          {positionCells}
        </div>
      </div>
    </>
  );
}
