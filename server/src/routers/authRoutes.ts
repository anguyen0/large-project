import express from 'express';
import registerController from '../controllers/registerController';
import { sanitizeRegisterInput } from '../middleware/registerInput';

const authRouter = express.Router();

authRouter.get('/', (req, res) => {
  res.send('Auth Test Route');
});

authRouter.post('/register', sanitizeRegisterInput, registerController);

export default authRouter;
