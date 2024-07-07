import express from 'express';
import registerController from '../controllers/registerController';
import {
  sanitizeRegisterInput,
  validateRegisterInput,
} from '../middleware/registerInputValidation';
import userConflict from '../middleware/userConflict';
import verifyAccountController from '../controllers/verifyAccountController';

const authRouter = express.Router();

authRouter.get('/', (req, res) => {
  res.send('Auth Test Route');
});

authRouter.post(
  '/register',
  sanitizeRegisterInput,
  validateRegisterInput,
  userConflict,
  registerController
);

authRouter.get('/verify-account/:validationToken', verifyAccountController);

export default authRouter;
