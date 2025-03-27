"use client";
import DebugConsole from "@/components/DebugConsole";
import dynamic from "next/dynamic";
// const InstallPrompt = dynamic(
//   () => import("@/components/beforeinstallprompt"),
//   {
//     ssr: false,
//   }
// );

export default function Home() {
  return (
    <>
      {/* <InstallPrompt /> */}
      <DebugConsole />
    </>
  );
}
