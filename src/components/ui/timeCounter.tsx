import { useEffect, useState } from "react";

export default function ElapsedTimeCounter({
  className,
  startTime,
}: {
  className?: string;
  startTime?: number;
}) {
  const [seconds, setSeconds] = useState<number>();

  useEffect(() => {
    const interval = setInterval(() => {
      if (startTime) {
        setSeconds(Math.floor((Date.now() - startTime) / 1_000));
      } else {
        setSeconds(undefined);
      }
    }, 1_000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [startTime]);

  const formatTime = (totalSeconds?: number) => {
    if (totalSeconds === undefined) return "-";

    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    if (h > 0) return `${h}h ${m}m ${s}s`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
  };

  return <span className={className}>{formatTime(seconds)}</span>;
}
