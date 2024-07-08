import express, { Express } from 'express';
import dotenv from 'dotenv';
import logger from './utils/logger.util';
import mongoose from 'mongoose';
import authRouter from './routes/auth.route';

// Load environment variables from .env file
dotenv.config();

// Initalize express application
const app: Express = express();

// Middleware
app.use(express.json());

// Routes
app.use('api/auth', authRouter);

// Database connections
const MONGO_URI = process.env.MONGO_URI as string;
mongoose
  .connect(MONGO_URI)
  .then(() => {
    logger('INFO', `Connected to MongoDB`, undefined, true);
  })
  .catch((error) => {
    logger('ERROR', error, undefined, true);
  });

// Start the server
const PORT: number = parseInt(process.env.PORT as string, 10) || 5000;

app.listen(PORT, () => {
  logger(
    'INFO',
    `Server is listening on http://localhost:${PORT}`,
    undefined,
    true
  );
});
