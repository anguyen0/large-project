import express, { Router } from 'express';
import sanitizeRegisterInput from '../middleware/sanitizeRegisterData';
import registerController from '../controllers/registerController.control';

const authRouter: Router = express.Router();

authRouter.post('/register', sanitizeRegisterInput, registerController);

export default authRouter;
