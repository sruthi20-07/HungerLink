import { useEffect, useState } from "react";
import { surplusAPI } from "../../services/api";
import type { SurplusReport } from "../../types";

export default function SurplusListPage() {
  const [items, setItems] = useState<SurplusReport[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await surplusAPI.getAll();
      setItems(res.data.data || res.data);
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h2>Available Surplus</h2>

      {items.map((item) => (
        <div key={item._id} className="card">
          <h3>{item.foodType}</h3>
          <p>Quantity: {item.estimatedQuantity}</p>
          <p>Status: {item.status}</p>
        </div>
      ))}
    </div>
  );
}
