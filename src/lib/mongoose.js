import mongoose from "mongoose";

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) {
    return; // Already connected
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
  } catch (error) {
    console.error("Database connection failed:", error);
    throw new Error("Database connection failed");
  }
}
