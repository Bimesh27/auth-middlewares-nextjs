import mongoose from "mongoose";

const connectDB = async () => {
  const connectionUrl = process.env.MONGO_URI as string;

  try {
    if (!connectionUrl) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
    const conn = await mongoose.connect(connectionUrl);
    console.log(`MongoDB connected Successfully ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};

export default connectDB;
