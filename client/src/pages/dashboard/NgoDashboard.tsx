import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../socket";
import axios from "axios";
import GoogleMapView from "../../components/GoogleMapView";

const NgoDashboard: React.FC = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState<any[]>([]);
  const [nearbyNgos, setNearbyNgos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );

  // 🔔 SOCKET LISTEN
  useEffect(() => {
    socket.on("new-surplus", (data) => {
      setNotifications((prev) => [data, ...prev]);
    });

    socket.on("surplus-claimed", (updated) => {
      setNotifications((prev) =>
        prev.map((item) =>
          item.id === updated.id ? updated : item
        )
      );
    });

    return () => {
      socket.off("new-surplus");
      socket.off("surplus-claimed");
    };
  }, []);

  // 📋 FETCH EXISTING SURPLUS
  useEffect(() => {
    const fetchSurplus = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/surplus"
        );

        if (res.data?.success) {
          setNotifications(res.data.data);
        }
      } catch (err) {
        console.error("Surplus fetch error:", err);
      }
    };

    fetchSurplus();
  }, []);

  // 📍 FETCH NGOS
  useEffect(() => {
    const fetchNgos = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/ngos"
        );

        if (res.data?.data) {
          setNearbyNgos(res.data.data);
        }
      } catch (err) {
        console.error("NGO fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNgos();
  }, []);

  // ✅ ACCEPT SURPLUS
  const handleAccept = async (id: string) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/surplus/accept/${id}`,
        {
          ngoName: currentUser?.organizationName,
        }
      );

      if (res.data?.success) {
        alert("Surplus accepted successfully");
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Already claimed");
    }
  };

  // ✅ LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "linear-gradient(135deg, #11998e, #38ef7d)",
        color: "white",
      }}
    >
      <h1>🤝 NGO Dashboard</h1>

      <h3>🔔 Available Surplus Food</h3>

      {notifications.length === 0 && <p>No surplus available.</p>}

      {notifications.map((item) => (
        <div
          key={item.id}
          style={{
            background: "white",
            color: "#333",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "10px",
          }}
        >
          <strong>{item.foodType}</strong>
          <p>Quantity: {item.estimatedQuantity}</p>

          {/* ✅ Show provider */}
          <p>
            Provider:{" "}
            {item.providerName || "Hostel / Food Provider"}
          </p>

          <p>Status: {item.status}</p>

          {/* ✅ Show who claimed */}
          {item.claimedBy && (
            <p>Claimed By: {item.claimedBy}</p>
          )}

          {/* ✅ Accept button */}
          {item.status === "available" && (
            <button
              onClick={() => handleAccept(item.id)}
              style={{
                marginTop: "10px",
                padding: "8px 12px",
                background: "#11998e",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Accept
            </button>
          )}
        </div>
      ))}

      {/* MAP SECTION */}
      <div style={{ marginTop: "40px" }}>
        <h3>📍 Registered NGOs</h3>
        {loading ? (
          <p>Loading map...</p>
        ) : (
          <GoogleMapView ngos={nearbyNgos} />
        )}
      </div>

      {/* NAVIGATION */}
      <div style={{ marginTop: "30px" }}>
        <button
          onClick={() => navigate("/surplus")}
          style={btn}
        >
          📋 Surplus List
        </button>

        <button
          onClick={() => navigate("/notifications")}
          style={btn}
        >
          🔔 Notifications
        </button>

        <button
          onClick={() => navigate("/ngos")}
          style={btn}
        >
          🏢 View NGOs
        </button>
      </div>

      {/* LOGOUT BUTTON */}
      <div style={{ marginTop: "40px" }}>
        <button
          onClick={handleLogout}
          style={{
            padding: "10px",
            width: "200px",
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

const btn: React.CSSProperties = {
  display: "block",
  marginBottom: "15px",
  padding: "12px",
  width: "250px",
  borderRadius: "8px",
  border: "none",
  background: "white",
  color: "#11998e",
  fontWeight: "bold",
  cursor: "pointer",
};

export default NgoDashboard;
