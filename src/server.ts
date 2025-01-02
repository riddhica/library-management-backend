import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { ConnectOptions } from "mongoose"
import cors from 'cors';
import bodyParser from 'body-parser';
import bookRoutes from './routes/bookRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
mongoose.connect('mongodb://localhost:27017/library', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions ).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error: ', err));

// Routes
app.use('/books', bookRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
