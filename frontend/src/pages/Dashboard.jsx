import { useEffect, useState } from "react";
import axios from "axios";
import ItemCard from "../components/ItemCard";
import useSocket from "../hooks/useSocket";

export default function Dashboard() {
  const [items, setItems] = useState([]);


  useEffect(() => {
    const API =
    "https://live-bidding-system.onrender.com" || "http://localhost:5000";
  
    axios
      .get(`${API}/items`)
      .then(res => setItems(res.data))
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
      <ItemCard key={item.id} item={item} />
    ))}
  </div>
</>

  );
}
