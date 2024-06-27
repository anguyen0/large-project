import express from 'express';
import registerController from '../../controllers/auth/registerController';
import validateRegisterRequest from '../../middleware/auth/validateRegisterRequest';


const authRouter = express.Router();

authRouter.post('/register', validateRegisterRequest, registerController);

export default authRouter;