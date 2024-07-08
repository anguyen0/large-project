import express, { Router } from 'express';
import registerController from '../controllers/registerController';
import verifyAccountController from '../controllers/verifyAccountController';

const authRouter: Router = express.Router();

authRouter.post('/register', registerController);
authRouter.get('/verify-account/:token', verifyAccountController);

export default authRouter;
