"use client";

import useScanSession from "@/components/hooks/useScanSessions";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { Session } from "@/services/scans.types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SingleFileResult } from "./fileResult";
import { FolderResult } from "./folderResult";
import { SessionNotFound } from "./notFound";
import ElapsedTimeCounter from "@/components/ui/timeCounter";

export default function SessionDetailsPage() {
  const { sessionId } = useParams();
  const { session, loading, error } = useScanSession(sessionId as string);
  const [sessionState, setSessionState] = useState<Session>();
  const router = useRouter();

  useEffect(() => {
    if (session?.status) {
      setSessionState(session);
    }
  }, [session]);

  useEffect(() => {
    console.log("Loading:", loading);
  }, [loading]);

  if (loading) {
    return <Loading />;
  }

  if (!sessionState) {
    return <SessionNotFound />;
  }

  if (["pending", "in_progress"].includes(sessionState.status)) {
    return (
      <div>
        <p>Scanning in progress:</p>
        <p>
          Elapsed Time:{" "}
          <ElapsedTimeCounter startTime={sessionState.createdAt} />
        </p>
      </div>
    );
  }
  return (
    <div className="w-full min-h-screen px-4 py-4 flex flex-col items-center bg-gray-900 text-white">
      {sessionState.scanTarget === "file" && (
        <SingleFileResult file={sessionState.files[0]} session={sessionState} />
      )}
      {sessionState.scanTarget === "folder" && (
        <FolderResult session={sessionState} />
      )}
      <Button
        className={`mt-4 text-white bg-green-500 hover:bg-green-600`}
        onClick={() => router.push("/")}
      >
        Perform another scan
      </Button>
    </div>
  );
}
