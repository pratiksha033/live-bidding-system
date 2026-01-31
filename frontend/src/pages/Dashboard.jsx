import { useEffect, useState } from "react";
import axios from "axios";
import ItemCard from "../components/ItemCard";
import useSocket from "../hooks/useSocket";

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [offset, setOffset] = useState(0); // ⭐ NEW

  useEffect(() => {
    const API = "https://live-bidding-system.onrender.com";

    axios
      .get(`${API}/items`)
      .then(res => {
        const { serverTime, items } = res.data;

        // ⭐ calculate server time sync offset
        const serverOffset = serverTime - Date.now();

        setOffset(serverOffset);
        setItems(items);
      })
      .catch(console.error);
  }, []);

  useSocket("UPDATE_BID", (updatedItem) => {
    setItems(prev =>
      prev.map(i => i.id === updatedItem.id ? updatedItem : i)
    );
  });

  return (
    <>
      <h1 className="title">🔥 Live Auctions</h1>

      <div className="grid">
        {items.map(item => (
          <ItemCard
            key={item.id}
            item={item}
            offset={offset}   // ⭐ pass to card
          />
        ))}
      </div>
    </>
  );
}
