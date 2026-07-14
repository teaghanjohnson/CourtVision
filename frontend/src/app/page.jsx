"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AnimatedLetters from "@/components/AnimatedLetters";

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
        <Image
          src="/courtvision-logo.png"
          alt="Court Vision Logo"
          width={500}
          height={500}
          priority
          className="w-[500px] h-[500px]"
        />
        <div className="text-3xl text-center font-bold text-black">
          <AnimatedLetters
            letterClass={letterClass}
            strArray={nameArray}
            idx={1}
          />
        </div>
        <div className="text-lg text-center text-black subtitle-fade">
          {subArray.join("")}
        </div>
        <Link
          href="/teams"
          className="text-white text-[13px] font-normal tracking-[4px] font-sans no-underline py-[10px] px-[18px] rounded-[7px] bg-[#5faceb] mt-[25px] float-left whitespace-nowrap"
        >
          Enter
        </Link>
      </div>
    </>
  );
}
