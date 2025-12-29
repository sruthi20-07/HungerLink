import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User, UserRole } from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, email, password, role, phone, location } = req.body;

    if (!name || !email || !password || !role || !phone || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password, role, phone, location });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Registration failed", error });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const valid = await user.comparePassword(password);
    if (!valid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Login failed", error });
  }
};

export const refreshToken = async (_req: Request, res: Response): Promise<Response> => {
  return res.json({ message: "Not implemented" });
};

export const getProfile = async (req: any, res: Response): Promise<Response> => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Profile fetch failed", error });
  }
};
