import { Request, Response } from "express";
import Ngo from "../models/Ngo";

/**
 * Create NGO
 */
export const createNgo = async (req: Request, res: Response) => {
  try {
    const { name, phone, email, address, longitude, latitude } = req.body;

    if (!name || !phone || !longitude || !latitude) {
      return res.status(400).json({
        message: "Name, phone, longitude and latitude are required",
      });
    }

    const ngo = await Ngo.create({
      name,
      phone,
      email,
      address,
      location: {
        type: "Point",
        coordinates: [Number(longitude), Number(latitude)],
      },
    });

    res.status(201).json(ngo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating NGO" });
  }
};

/**
 * Get all NGOs
 */
export const getAllNgos = async (_req: Request, res: Response) => {
  try {
    const ngos = await Ngo.find();
    res.json(ngos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching NGOs" });
  }
};

/**
 * Get Nearby NGOs (within 5km)
 */
export const getNearbyNgos = async (req: Request, res: Response) => {
  try {
    const { longitude, latitude } = req.query;

    if (!longitude || !latitude) {
      return res.status(400).json({
        message: "Longitude and latitude are required",
      });
    }

    const ngos = await Ngo.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [Number(longitude), Number(latitude)],
          },
          $maxDistance: 5000, // 5km
        },
      },
    });

    res.json(ngos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching nearby NGOs" });
  }
};
