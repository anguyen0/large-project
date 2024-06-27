import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

const validateLoginRequest = [

    check('email')
    .trim()
    .normalizeEmail()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),

    check('password')
    .trim()
    .notEmpty().withMessage('Password is required')
    .isLength({ max:64 }).withMessage('Pasword cannot exceed 64 characters'),

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

export default validateLoginRequest;