import { useEffect, useState } from "react";

export default function CountdownTimer({ endTime, offset }) {
  const [time, setTime] = useState(endTime - (Date.now() + offset));

  useEffect(() => {
    const interval = setInterval(() => {
      const serverNow = Date.now() + offset; // ⭐ server-synced time
      setTime(endTime - serverNow);
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime, offset]);

  // your existing logic kept exactly
  const ONE_DAY = 24 * 60 * 60 * 1000;
  if (time > ONE_DAY) return <p className="timer live">🟢 Live</p>;
  if (time <= 0) return <p>Ended</p>;

  const seconds = Math.floor(time / 1000);

  return <span className="timer">⏳ {seconds}s left</span>;
}
