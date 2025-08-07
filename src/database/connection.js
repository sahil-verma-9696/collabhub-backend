import mongoose from "mongoose";

import { configDotenv } from "dotenv";

configDotenv({
  path: "./local.env",
});

async function connectDB(DATABASE_NAME) {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: DATABASE_NAME,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export default connectDB;
