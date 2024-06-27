import express from 'express';
import registerController from '../../controllers/auth/registerController';
import validateRegisterRequest from '../../middleware/auth/validateRegisterRequest';
import checkForRegisterConflicts from '../../middleware/auth/checkForRegisterConflicts';
import verifyAccountController from '../../controllers/auth/verifyAccount';
import loginController from '../../controllers/auth/loginController';
import validateLoginRequest from '../../middleware/auth/validateLoginRequest';
import requestPasswordResetController from '../../controllers/auth/requestPasswordResetController';
import validateForgotPasswordRequest from '../../middleware/auth/validateForgotPasswordRequest';
import resetPasswordController from '../../controllers/auth/resetPasswordController';
import validateResetPasswordRequest from '../../middleware/auth/validateResetPasswordRequest';


const authRouter = express.Router();

authRouter.post('/register', validateRegisterRequest, checkForRegisterConflicts, registerController);
authRouter.get('/verify-account/:token', verifyAccountController);
authRouter.post('/login', validateLoginRequest, loginController);
authRouter.post('/forgot-password', validateForgotPasswordRequest, requestPasswordResetController);
authRouter.post('/reset-password', validateResetPasswordRequest, resetPasswordController);

export default authRouter;