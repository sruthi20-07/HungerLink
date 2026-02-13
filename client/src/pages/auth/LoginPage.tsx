import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
  setError("");

  if (!email || !password) {
    setError("Please enter email and password");
    return;
  }

  let users = [];

  try {
    const stored = localStorage.getItem("users");
    users = stored ? JSON.parse(stored) : [];
    if (!Array.isArray(users)) users = [];
  } catch {
    users = [];
  }

  const user = users.find(
    (u: any) =>
      u.email === email.trim().toLowerCase() &&
      u.password === password
  );

  if (!user) {
    setError("Invalid credentials");
    return;
  }

  localStorage.setItem(
    "currentUser",
    JSON.stringify(user)
  );

  if (user.role === "ngo") {
    window.location.href = "/ngo-dashboard";
  } else {
    window.location.href = "/dashboard";
  }
};


  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ textAlign: "center" }}>Login</h2>

        {error && <p style={errorStyle}>{error}</p>}

        <input
          style={inputStyle}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={inputStyle}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={buttonStyle} onClick={handleLogin}>
          Login
        </button>

        <p style={{ textAlign: "center", marginTop: 15 }}>
          Don’t have an account?{" "}
          <span
            style={{ color: "#1976d2", cursor: "pointer", fontWeight: 600 }}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #43cea2, #185a9d)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const cardStyle: React.CSSProperties = {
  background: "white",
  padding: "40px",
  borderRadius: "12px",
  width: "400px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  background: "#1976d2",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const errorStyle: React.CSSProperties = {
  color: "red",
  marginBottom: "10px",
};

export default LoginPage;
