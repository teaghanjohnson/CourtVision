import Image from "next/image";
import Link from "next/link";
export default function Layout({ children }) {
  return (
    <html>
      <body>
        <Link href="/">
          <Image
            src="/courtvision-mark.png"
            alt="small-logo"
            width={40}
            height={40}
          />
        </Link>
        {children}
      </body>
    </html>
  );
}
