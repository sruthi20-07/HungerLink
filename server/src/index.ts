import dotenv from "dotenv";
dotenv.config();

import path from "path";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import { createServer } from "http";
import { Server } from "socket.io";

import { connectDatabase } from "./config/database.js";
import authRoutes from "./routes/auth.js";
import surplusRoutes from "./routes/surplus.js";


const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const PORT = Number(process.env.PORT) || 5000;

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:3000" }));
app.use(compression());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -------------------- API ROUTES --------------------
app.use("/auth", authRoutes);
app.use("/surplus", surplusRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "OK" });
});

// -------------------- FRONTEND SERVING --------------------
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// -------------------- SERVER START --------------------
async function startServer() {
  try {
    await connectDatabase();
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🔗 Health: http://localhost:${PORT}/health`);
    });
  } catch (err) {
    console.error("❌ Startup failed:", err);
    process.exit(1);
  }
}

startServer();

export { io };
