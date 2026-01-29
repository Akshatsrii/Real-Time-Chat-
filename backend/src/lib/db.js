import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/realchat"
    );
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection error:", error);
    process.exit(1);
  }
};
