import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      family: 4,
      retryWrites: true,
    });

    console.log("MongoDB Connected:", conn.connection.host);
  } catch (error) {
    console.log("MongoDB FAILED");
    console.error(error);
    process.exit(1);
  }
};
