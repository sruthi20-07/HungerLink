import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import Ngo from "../models/Ngo";

const JWT_SECRET = process.env.JWT_SECRET || "hackathon_secret";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, phone, latitude, longitude } =
      req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password, // store directly for now (hackathon mode)
      role,
      phone,
    });

    if (role === "ngo" && latitude && longitude) {
      await Ngo.create({
        name,
        phone,
        email,
        location: {
          type: "Point",
          coordinates: [Number(longitude), Number(latitude)],
        },
      });
    }

    return res.json({ success: true });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: "Registration failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 🔥 DIRECT PASSWORD CHECK (no bcrypt)
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      token,
      role: user.role,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Login failed" });
  }
};

export const refreshToken = async (_req: Request, res: Response) => {
  return res.json({ message: "Not implemented" });
};

export const getProfile = async (req: any, res: Response) => {
  const user = await User.findById(req.user.id);
  return res.json(user);
};
