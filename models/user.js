import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

// Prevent model overwrite issues in Vercel
export default mongoose.models.User || mongoose.model("User", userSchema);
