import express, { Request, Response } from 'express';
import cors from 'cors';
import bookRoutes from './routes/bookRoutes';

import connectDB from './db';
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/books', bookRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
