import type { ReactNode } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Sidebar />
      {children}
    </>
  );
}
