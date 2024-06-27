import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

const validateResetPasswordRequest = [

    check('password')
    .trim()
    .notEmpty().withMessage('Password is required')
    .isLength({ max:64 }).withMessage('Pasword cannot exceed 64 characters')
    .isStrongPassword().withMessage('Password weak. The passwors must be at least 8 characters long and contain at least 1 uppercase, 1 lowercase, 1 number, and 1 symbol'),

    check('confirm_password')
    .trim()
    .notEmpty().withMessage('Confirm password is required')
    .isLength({ max:64 }).withMessage('Confirm pasword cannot exceed 64 characters')
    .isStrongPassword().withMessage('Confirm password weak. The passwors must be at least 8 characters long and contain at least 1 uppercase, 1 lowercase, 1 number, and 1 symbol')
    .custom((confirm_pass, {req}) => {

        if(confirm_pass !== req.body.password) {
            throw new Error('Passwords do not match')
        }

        return true;

    }),

    (req:Request, res:Response, next:NextFunction) => {

        const errors = validationResult(req);
        const validation_errors: { [field_name: string]: string[] } = {};

        if(!errors.isEmpty()) {
            
            errors.array().forEach(error => {

                if('path' in error) {

                    if(!validation_errors[error.path]) {
                        validation_errors[error.path] = [];
                    }

                    validation_errors[error.path].push(error.msg);

                }

            });

            // Return validation error if any
            if(Object.keys(validation_errors).length > 0) {

                return res.status(400).json({
                    validation_errors:validation_errors
                });

            }

        }

        next();

    }

];

export default validateResetPasswordRequest;