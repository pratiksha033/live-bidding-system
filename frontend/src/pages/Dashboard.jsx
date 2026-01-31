import { useEffect, useState } from "react";
import axios from "axios";
import ItemCard from "../components/ItemCard";
import useSocket from "../hooks/useSocket";

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [offset, setOffset] = useState(0); // ⭐ NEW

  useEffect(() => {
    const API = import.meta.env.VITE_API_URL;
  
    axios
      .get(`${API}/items`)
      .then(res => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.items;
  
        setItems(data);
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
