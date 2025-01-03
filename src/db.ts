import mongoose from 'mongoose';
//import { ConnectOptions } from "mongoose";
import dotenv from 'dotenv';

// Load env variables
dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const dbURI = process.env.MONGODB_URI;
    if (!dbURI) {
      throw new Error('MongoDB URI is not defined in environment variables');
    }

    await mongoose.connect(dbURI);

    console.log('MongoDB connected');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
};

export default connectDB;
