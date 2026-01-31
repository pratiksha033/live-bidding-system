import { useEffect, useState } from "react";
import axios from "axios";
import ItemCard from "../components/ItemCard";
import useSocket from "../hooks/useSocket";

export default function Dashboard() {
  const [items, setItems] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:5000/items").then(res => {
      setItems(res.data);
    });
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
