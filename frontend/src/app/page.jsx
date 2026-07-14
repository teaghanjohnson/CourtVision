"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AnimatedLetters from "@/components/AnimatedLetters";
import InertiaLogo from "@/components/InertiaLogo";

export default function Page() {
  const [letterClass, setLetterClass] = useState("text-animate");
  const nameArray = [
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
  const subArray = [
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
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <InertiaLogo size={500} />
        <div className="text-3xl text-center font-bold text-white">
          <AnimatedLetters
            letterClass={letterClass}
            strArray={nameArray}
            idx={1}
          />
        </div>
        <div className="text-lg text-center text-white subtitle-fade">
          {subArray.join("")}
        </div>
        <Link
          href="/teams"
          className="text-white text-[13px] font-bold tracking-[4px] font-sans no-underline py-[10px] px-[18px] rounded-[7px] bg-[#5faceb] mt-[25px] float-left whitespace-nowrap transition-all duration-300 ease-in-out hover:bg-white hover:text-[#5faceb]"
        >
          Enter
        </Link>
      </div>
    </>
  );
}
