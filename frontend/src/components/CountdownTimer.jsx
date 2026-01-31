import { useEffect, useState } from "react";

export default function CountdownTimer({ endTime }) {
  const [time, setTime] = useState(endTime - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(endTime - Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  // ✅ NEW: if very far future → show Live
  const ONE_DAY = 24 * 60 * 60 * 1000;
  if (time > ONE_DAY) return <p className="timer live">🟢 Live</p>;

  // existing logic (unchanged)
  if (time <= 0) return <p>Ended</p>;

  const seconds = Math.floor(time / 1000);

  return <span className="timer">⏳ {seconds}s left</span>;
}
