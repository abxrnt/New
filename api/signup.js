import mongoose from "mongoose";
import User from "../models/user.js";

export default async function handler(req, res) {
  // Allow only POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Connect to MongoDB (Vercel will read the MONGO_URI from Environment Variables)
    await mongoose.connect(process.env.MONGO_URI);

    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Save user to database
    await User.create({ name, email, password });

    return res.status(201).json({ message: "User saved successfully!" });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: "Server error. Try again later." });
  }
}
