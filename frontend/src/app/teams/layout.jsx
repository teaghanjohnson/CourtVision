import Image from "next/image";
import Link from "next/link";
import { div } from "three/src/nodes/math/OperatorNode";
export default function Layout({ children }) {
  return (
    <>
      <Link href="/">
        <Image
          src="/courtvision-mark.png"
          alt="small-logo"
          width={40}
          height={40}
        />
      </Link>
      {children}
    </>
  );
}
