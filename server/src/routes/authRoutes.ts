import express, { Router } from 'express';
import registerController from '../controllers/registerController';

const authRouter: Router = express.Router();

authRouter.post('/register', registerController);

export default authRouter;
