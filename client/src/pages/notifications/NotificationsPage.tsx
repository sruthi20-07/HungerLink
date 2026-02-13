import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [surplus, setSurplus] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurplus = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/surplus");

        if (res.data?.success) {
          setSurplus(res.data.data);
        } else {
          setSurplus([]);
        }
      } catch (error) {
        console.error("Surplus fetch error:", error);
        setSurplus([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSurplus();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "linear-gradient(135deg, #43cea2, #185a9d)",
        color: "white",
      }}
    >
      <h1>🔔 Surplus Notifications</h1>

      {loading ? (
        <p>Loading...</p>
      ) : surplus.length === 0 ? (
        <p>No surplus available.</p>
      ) : (
        surplus.map((item: any) => (
          <div
            key={item.id}
            style={{
              background: "white",
              color: "#333",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
            }}
          >
            <strong>{item.foodType}</strong>
            <p>Quantity: {item.estimatedQuantity}</p>
            <p>Status: {item.status}</p>
            {item.claimedBy && <p>Claimed By: {item.claimedBy}</p>}
          </div>
        ))
      )}

      <button
        onClick={() => navigate(-1)}
        style={{
          marginTop: "30px",
          padding: "10px",
          background: "black",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        ⬅ Back
      </button>
    </div>
  );
};

export default NotificationsPage;
