import express, { Express } from 'express';
import dotenv from 'dotenv';
import logger from './utils/logger.util';

// Load environment variables from .env file
dotenv.config();

// Initalize express application
const app: Express = express();

// Middleware
app.use(express.json());

// Routes

// Database connections

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
