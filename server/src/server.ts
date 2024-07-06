import authRouter from './routers/authRoutes';
import connectToDb from './config/connectToDb';
import dotenv from 'dotenv';
import express, { Express } from 'express';

dotenv.config();

const app: Express = express();
const port: number = parseInt(process.env.PORT as string, 10) || 5000;

app.use(express.json());
app.use('/api/auth', authRouter);

connectToDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

export default app;
