import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import { createServer } from "http";
import { Server } from "socket.io";

import { connectDatabase } from "./config/database";
import authRoutes from "./routes/auth";
import surplusRoutes from "./routes/surplus";
import ngoRoutes from "./routes/ngos";

const app = express();
const server = createServer(app);

// 🔥 EXPORT SOCKET FOR CONTROLLERS
export const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

// -------------------- MIDDLEWARE --------------------

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  })
);
app.use(compression());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -------------------- ROUTES --------------------

app.use("/auth", authRoutes);
app.use("/api/surplus", surplusRoutes);
app.use("/api/ngos", ngoRoutes);

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "OK" });
});

// -------------------- STATIC FRONTEND (Production Only) --------------------

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// -------------------- START SERVER --------------------

const startServer = async () => {
  try {
    await connectDatabase();

    server.listen(PORT, () => {
      console.log("✅ MongoDB Connected");
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🔗 Health Check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error);
    process.exit(1);
  }
};

startServer();
