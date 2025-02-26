import { useState, useEffect } from "react";
import {
  fetchSessionStatus,
  subscribeToSessionUpdates,
} from "@/services/scanning.service";
import { Session } from "@/services/scans.types";

const useScanSession = (sessionId?: string) => {
  const [session, setSession] = useState<Session>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sessionId) return;

    let unsubscribe = () => {};

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const { data, isStreaming } = await fetchSessionStatus(sessionId);

      if (data) {
        setSession(data);
        setLoading(false);
        return;
      }

      // If no immediate data, fallback to SSE
      if (isStreaming) {
        unsubscribe = subscribeToSessionUpdates(
          sessionId,
          (update) => {
            if (!update?.status) {
              return;
            }
            if (update?.status === "completed") {
              setLoading(true);
              setTimeout(() => {
                setSession(update);
                setLoading(false);
              }, 1_000);
            } else {
              setSession(update);
              setLoading(false);
            }
          },
          (errMsg) => {
            setError(errMsg);
            setLoading(false);
          }
        );
      }
      setLoading(false);
    };

    fetchData();

    return () => {
      unsubscribe(); // Cleanup SSE when component unmounts
    };
  }, [sessionId]);

  return { session, loading, error };
};

export default useScanSession;
