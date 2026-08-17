"use client";
import Link from "next/link";
import "./Sidebar.scss";
import Image from "next/image";
import {
  faMagnifyingGlass,
  faFlag,
  faHome,
  faUsers,
  faUser,
  faFile,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

        <div className="nav-links">
          <Link href="/" className="home-link">
            <FontAwesomeIcon icon={faHome} />
          </Link>

          <Link href="/teams" className="teams-link">
            <FontAwesomeIcon icon={faUsers} />
          </Link>

          <Link href="/nations" className="country-link">
            <FontAwesomeIcon icon={faFlag} />
          </Link>
          <Link href="/positions" className="positions-link">
            <FontAwesomeIcon icon={faUser} />
          </Link>
          <Link href="/search" className="search-link">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Link>
        </div>
      </div>
    </>
  );
}
