import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("❌ Please define the MONGODB_URI environment variable");
}

interface MongooseGlobal {
  mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}

const globalWithMongoose = globalThis as typeof globalThis & MongooseGlobal;

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<Mongoose> {
  if (globalWithMongoose.mongoose.conn) {
    console.log("✅ Using existing MongoDB connection");
    return globalWithMongoose.mongoose.conn;
  }

  if (!globalWithMongoose.mongoose.promise) {
    console.log("🟡 Connecting to MongoDB at:", MONGODB_URI);
    globalWithMongoose.mongoose.promise = mongoose.connect(MONGODB_URI, {
      dbName: "password-manager",
      bufferCommands: false,
    });
  }

  try {
    globalWithMongoose.mongoose.conn = await globalWithMongoose.mongoose.promise;
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }

  return globalWithMongoose.mongoose.conn!;
}

export default dbConnect;
