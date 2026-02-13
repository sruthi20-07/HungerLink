import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BackButton from "../../components/BackButton";
import GoogleMapView from "../../components/GoogleMapView";

const ProviderDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [ngos, setNgos] = useState<any[]>([]);

  useEffect(() => {
    fetchNgos();
  }, []);

  const fetchNgos = async () => {
    const res = await axios.get("http://localhost:5000/api/ngos");
    if (res.data?.data) setNgos(res.data.data);
  };

  return (
    <div style={container}>
      <BackButton />

      <h1>Food Provider Dashboard</h1>

      <button onClick={() => navigate("/create-surplus")}>
        Create Surplus
      </button>

      <button onClick={() => navigate("/surplus")}>
        View Surplus
      </button>

      <h3 style={{ marginTop: 40 }}>Nearby NGOs</h3>
      <GoogleMapView ngos={ngos} />

      <button
        style={logout}
        onClick={() => {
          localStorage.removeItem("currentUser");
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
};

const container: React.CSSProperties = {
  minHeight: "100vh",
  padding: "40px",
  background: "linear-gradient(135deg, #36d1dc, #5b86e5)",
};

const logout: React.CSSProperties = {
  marginTop: "40px",
  padding: "10px",
  background: "red",
  color: "white",
  border: "none",
};

export default ProviderDashboard;
