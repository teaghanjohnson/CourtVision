import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import type { ReactNode } from "react";
import { Libre_Baskerville, DM_Sans } from "next/font/google";

config.autoAddCss = false;

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-libre-baskerville",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html className={`${libreBaskerville.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
