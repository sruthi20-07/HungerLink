import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      style={{
        position: "absolute",
        top: 20,
        left: 20,
        padding: "6px 10px",
        background: "black",
        color: "white",
        border: "none",
      }}
    >
      Back
    </button>
  );
};

export default BackButton;
