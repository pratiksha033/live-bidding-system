import { useEffect, useState } from "react";
import axios from "axios";
import ItemCard from "../components/ItemCard";
import useSocket from "../hooks/useSocket";

export default function Dashboard() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log("FETCHING ITEMS...");
  
    axios
      .get("https://live-bidding-system.onrender.com/items")
      .then(res => {
        console.log("DATA:", res.data);
        setItems(res.data);
      })
      .catch(err => {
        console.error("ERROR:", err);
      });
  }, []);
  

  // ✅ realtime updates
  useSocket("UPDATE_BID", (updatedItem) => {
    setItems(prev =>
      prev.map(i =>
        i.id === updatedItem.id ? updatedItem : i
      )
    );
  });

  return (
    <>
      <h1 className="title">🔥 Live Auctions</h1>

      <div className="grid">
        {items.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}
