import express from 'express';
import registerController from '../../controllers/auth/registerController';
import validateRegisterRequest from '../../middleware/auth/validateRegisterRequest';
import checkForRegisterConflicts from '../../middleware/auth/checkForRegisterConflicts';
import verifyAccountController from '../../controllers/auth/verifyAccount';


const authRouter = express.Router();

authRouter.post('/register', validateRegisterRequest, checkForRegisterConflicts, registerController);
authRouter.get('/verify-account/:token', verifyAccountController);

export default authRouter;