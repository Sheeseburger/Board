import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import boardRoute from './routes/Board.route';
import cardRoute from './routes/Card.route';
import columnRoute from './routes/Column.route';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/board', cardRoute);
app.use('/api/board', columnRoute);
app.use('/api/board', boardRoute);
mongoose
  .connect(process.env.DATABASE || '')
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => console.error(err));

// Routes

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
