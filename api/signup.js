import mongoose from "mongoose";
import User from "../models/user.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);

    const { name, email, password } = req.body;
    await User.create({ name, email, password });

    return res.status(201).json({ message: "User saved successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
