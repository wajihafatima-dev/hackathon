// import mongoose from "mongoose";

// let isConnected = false;

// export async function connectToDatabase() {
//   if (isConnected) {
//     return; // Already connected
//   }

//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     isConnected = true;
//   } catch (error) {
//     console.error("Database connection failed:", error);
//     throw new Error("Database connection failed");
//   }
// }
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;


