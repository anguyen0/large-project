import express from 'express';
import registerController from '../../controllers/auth/registerController';
import validateRegisterRequest from '../../middleware/auth/validateRegisterRequest';
import checkForRegisterConflicts from '../../middleware/auth/checkForRegisterConflicts';


const authRouter = express.Router();

authRouter.post('/register', validateRegisterRequest, checkForRegisterConflicts, registerController);

export default authRouter;