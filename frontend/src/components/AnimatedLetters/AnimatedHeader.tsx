"use client";

import { useEffect, useState } from "react";
import AnimatedLetters from "./AnimatedLetters";

interface AnimatedHeaderProps {
  text: string;
  idx?: number;
}

const AnimatedHeader = ({ text, idx = 15 }: AnimatedHeaderProps) => {
  const [letterClass, setLetterClass] = useState<string>("text-animate");
  const chars = text.split("");

  useEffect(() => {
    const finishMs = ((chars.length - 1 + idx) / 10 + 1) * 1000 + 300;
    const timer = setTimeout(() => {
      setLetterClass("text-animate-hover");
    }, finishMs);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, idx]);

  return (
    <AnimatedLetters letterClass={letterClass} strArray={chars} idx={idx} />
  );
};

export default AnimatedHeader;
