import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

const validateRegisterRequest = [

    check('first_name')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({ max:50 }).withMessage('First name cannot exceed 50 characters')
    .matches(/^[a-zA-Z0-9\-'.]+$/).withMessage("First name can only contain the following characters [a-z, A-Z, 0-9, ', -, .]"),

    check('last_name')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .isLength({ max:50 }).withMessage('Last name cannot exceed 50 characters')
    .matches(/^[a-zA-Z0-9\-'.]+$/).withMessage("Last name can only contain the following characters [a-z, A-Z, 0-9, ', -, .]"),

    check('email')
    .trim()
    .normalizeEmail()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),

    check('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ max:50 }).withMessage('Username cannot exceed 50 characters')
    .matches(/^[a-zA-Z_][a-zA-Z0-9'-.]*$/).withMessage("User name can only contain the following characters [a-z, A-Z, 0-9, ', -, ., _] and the first character must be a letter or _"),

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

export default validateRegisterRequest;