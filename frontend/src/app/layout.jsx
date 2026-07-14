import "./globals.css";
import Link from "next/link";
export default function Layout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
