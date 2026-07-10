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
      <div className="text-lg  text-3xl text-center text-bold text-black">
        The Future of Fantasy.
      </div>

      <button>Enter</button>
    </>
  );
}
