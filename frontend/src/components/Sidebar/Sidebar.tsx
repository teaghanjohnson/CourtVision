"use client";
import Link from "next/link";
import "./Sidebar.css";
import Image from "next/image";
export default function Sidebar() {
  return (
    <>
      <div className="nav-bar">
        <Link href="/">
          <Image
            src="/courtvision-mark.png"
            alt="small-logo"
            width={40}
            height={40}
          />
        </Link>
        ;
        <Link href="/teams" className="nav-link">
          Teams
        </Link>
        ;
        <Link href="/players" className="nav-link">
          Players
        </Link>
        ;
      </div>
    </>
  );
}
