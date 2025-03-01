import { LoadingSpinner } from "@/components/ui/loading";
import ElapsedTimeCounter from "@/components/ui/timeCounter";
import { Session } from "@/services/scans.types";
import { Roboto_Slab as makeHeadingFont } from "next/font/google";
import { Barlow as makePFont } from "next/font/google";

const headingFont = makeHeadingFont({ weight: "400" });
const pFont = makePFont({ weight: "400" });

export function InProgress({ sessionState }: { sessionState?: Session }) {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h2 className={`text-3xl ${headingFont.className}`}>
        Scanning in progress
      </h2>
      <LoadingSpinner />
      <span className={`${pFont.className} text-lg`}>
        Elapsed Time:{" "}
        <ElapsedTimeCounter
          startTime={sessionState?.createdAt}
        />
      </span>
    </div>
  );
}
