"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AnimatedLetters from "@/components/AnimatedLetters/AnimatedLetters";
import InertiaLogo from "@/components/InertiaLogo/InertiaLogo";
import Image from "next/image";

export default function Page() {
  const [letterClass, setLetterClass] = useState<string>("text-animate");
  const nameArray: string[] = [
    "T",
    "h",
    "e",
    " ",
    "F",
    "u",
    "t",
    "u",
    "r",
    "e",
    " ",
    "o",
    "f",
    " ",
    "F",
    "a",
    "n",
    "t",
    "a",
    "s",
    "y",
  ];
  const subArray: string[] = [
    "A",
    " ",
    "N",
    "B",
    "A",
    " ",
    "d",
    "a",
    "t",
    "a",
    " ",
    "h",
    "u",
    "b",
    " ",
    "f",
    "o",
    "r",
    " ",
    "f",
    "a",
    "n",
    "t",
    "a",
    "s",
    "y",
    " ",
    "s",
    "p",
    "o",
    "r",
    "t",
    "s",
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass("text-animate-hover");
    }, 4000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-col justify-center image-fade">
          <Image
            src="/courtvision-title-logo.png"
            alt="CourtVision logo"
            width={500}
            height={73}
            priority
          />
          <div
            className="ml-10 text-4xl font-bold text-white"
            style={{ fontFamily: "Coolvetica, Arial, sans-serif" }}
          >
            <AnimatedLetters
              letterClass={letterClass}
              strArray={nameArray}
              idx={1}
            />
          </div>
          <div
            className="ml-10 text-rg text-white subtitle-fade"
            style={{ fontFamily: "Coolvetica, Arial, sans-serif" }}
          >
            {subArray.join("")}
          </div>
          <Link
            href="/teams"
            className="w-22 ml-10 text-center text-white text-[13px] font-bold tracking-[4px] font-sans no-underline py-[10px] px-[18px] rounded-[7px] bg-[#5faceb] mt-[25px] float-left whitespace-nowrap transition-all duration-300 ease-in-out hover:bg-white hover:text-[#5faceb]"
          >
            Enter
          </Link>
        </div>

        <div className="flex mt-25 ml-15 justify-items-center justify-center min-h-screen text-center">
          <InertiaLogo size={500} />
        </div>
      </div>
    </>
  );
}
