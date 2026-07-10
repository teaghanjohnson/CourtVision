import "./globals.css";
import Link from "next/link";
export default function Layout({ children }) {
  return (
    <html>
      <body>
        <nav>
          <Link href="/teams">Enter</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
