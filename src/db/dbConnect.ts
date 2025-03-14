import mongoose from "mongoose";

const MONGODB_URI = process.env.DATABASE_URL as string;

if (!MONGODB_URI) {
  throw new Error("Please define the DATABASE_URL environment variable");
}

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return; // Avoid multiple connections
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Database connected successfully");
  } catch (error: any) {
    console.error("Database connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
