import Image from "next/image";

export default function Page() {
  return (
    <>
      <Image
        src="/courtvision-logo.png"
        alt="Court Vision Logo"
        width={500}
        height={500}
      />
      <div className="text-lg text-bold text-white">The Future of Fantasy.</div>
    </>
  );
}
