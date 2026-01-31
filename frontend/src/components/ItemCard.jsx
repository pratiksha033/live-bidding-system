import { socket } from "../socket";
import CountdownTimer from "./CountdownTimer";
import { useState, useEffect, useRef } from "react";

const myId = crypto.randomUUID();

export default function ItemCard({ item }) {
  const [flash, setFlash] = useState(false);
  const [outbid, setOutbid] = useState(false);


  const prevHighest = useRef(item.highestBidder);


  useEffect(() => {
    setFlash(true);
    const t = setTimeout(() => setFlash(false), 300);
    return () => clearTimeout(t);
  }, [item.currentBid]);


  useEffect(() => {
    if (
      prevHighest.current === myId &&
      item.highestBidder !== myId
    ) {
      setOutbid(true);

      setTimeout(() => setOutbid(false), 900);
    }

    prevHighest.current = item.highestBidder;
  }, [item.highestBidder]);


  const placeBid = () => {
    socket.emit("BID_PLACED", {
      itemId: item.id,
      userId: myId,
      amount: item.currentBid + 10,
    });
  };

  const classes = `
    card
    ${flash ? "flash" : ""}
    ${outbid ? "outbid" : ""}
  `;

  return (
    <div className={classes}>
      <h3>{item.title}</h3>

      {item.highestBidder === myId && (
        <span className="win">🏆 Winning</span>
      )}

      <h2>${item.currentBid}</h2>

      <CountdownTimer endTime={item.endTime} offset={offset} />

      <button onClick={placeBid}>Bid +$10</button>
    </div>
  );
}
