import React, { useState } from "react";
import { surplusAPI } from "../../services/api";
import BackButton from "../../components/BackButton";

const CreateSurplusPage: React.FC = () => {
  const [foodType, setFoodType] = useState("");
  const [estimatedQuantity, setEstimatedQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!foodType.trim() || !estimatedQuantity.trim()) {
      alert("Food type and quantity required");
      return;
    }

    setLoading(true);

    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          await surplusAPI.create({
            foodType,
            estimatedQuantity,
            description,
            latitude,
            longitude,
          });

          // Fast UI reset
          setFoodType("");
          setEstimatedQuantity("");
          setDescription("");

          alert("Surplus Created Successfully");
        } catch (error) {
          alert("Failed to submit surplus");
        } finally {
          setLoading(false);
        }
      },
      () => {
        alert("Location permission denied");
        setLoading(false);
      }
    );
  };

  return (
    <div style={container}>
      <BackButton />

      <div style={card}>
        <h2>Create Surplus Food</h2>

        <input
          placeholder="Food Type"
          value={foodType}
          onChange={(e) => setFoodType(e.target.value)}
          style={input}
        />

        <input
          placeholder="Quantity"
          value={estimatedQuantity}
          onChange={(e) => setEstimatedQuantity(e.target.value)}
          style={input}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={input}
        />

        <button onClick={handleSubmit} style={button} disabled={loading}>
          {loading ? "Submitting..." : "Submit Surplus"}
        </button>
      </div>
    </div>
  );
};

const container: React.CSSProperties = {
  minHeight: "100vh",
  padding: "40px",
  background: "linear-gradient(135deg, #36d1dc, #5b86e5)",
};

const card: React.CSSProperties = {
  background: "white",
  padding: "30px",
  borderRadius: "12px",
  maxWidth: "450px",
  margin: "0 auto",
};

const input: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
};

const button: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  background: "#1976d2",
  color: "white",
  border: "none",
};

export default CreateSurplusPage;
