import express, { Express } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port: number = parseInt(process.env.PORT as string, 10) || 5000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is listening in port ${port}`);
});
