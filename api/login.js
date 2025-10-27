import mongoose from "mongoose";
import User from "../models/user.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // connect to MongoDB Atlas
    await mongoose.connect(process.env.MONGO_URI);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // find user
    const user = await User.findOne({ email, password });

    if (user) {
      return res.status(200).json({ success: true, message: "Login successful" });
    } else {
      return res.status(401).json({ success: false, error: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
