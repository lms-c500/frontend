import { useEffect, useState } from "react";

export default function ElapsedTimeCounter({
  startTime,
}: {
  startTime: number;
}) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(Math.floor((Date.now() - startTime) / 1_000));
    }, 1_000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return <span>{seconds}s</span>;
}
