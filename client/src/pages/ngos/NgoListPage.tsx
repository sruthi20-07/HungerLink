import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NgoListPage: React.FC = () => {
  const navigate = useNavigate();
  const [ngos, setNgos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNgos = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/ngos");

        // Backend returns: { success: true, data: [...] }
        if (res.data && res.data.data) {
          setNgos(res.data.data);
        } else {
          setNgos([]);
        }
      } catch (error) {
        console.error("NGO fetch error:", error);
        setNgos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNgos();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "linear-gradient(135deg, #11998e, #38ef7d)",
        color: "white",
      }}
    >
      <h1>🏢 Registered NGOs</h1>

      {loading ? (
        <p>Loading NGOs...</p>
      ) : ngos.length === 0 ? (
        <p>No NGOs found.</p>
      ) : (
        ngos.map((ngo: any, index: number) => (
          <div
            key={index}
            style={{
              background: "white",
              color: "#333",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
            }}
          >
            <strong>{ngo.name}</strong>
            <p>Email: {ngo.email}</p>
            <p>Phone: {ngo.phone}</p>
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

export default NgoListPage;
