import sanitizeHtml from 'sanitize-html';
import { RegisterResponse } from 'types/registerRequest.type';
import { Request,Response,NextFunction } from 'express';

const sanitizeRegisterInput = (req:Request, res:Response, next:NextFunction): Response | void => {

    const {first_name, last_name, username, email}:
    {
        first_name: string,
        last_name: string,
        username: string,
        email: string
    } = req.body;


    const response: RegisterResponse = {
        timestamp: Date.now(),
        message: 'Confict Error',
        code: 400,
        errors: [],
    };


    // Loop through each field
    Object.keys(req.body).forEach(field => {

        // Sanitizes the current field
        const clean = sanitizeHtml(req.body[field], {
            allowedTags: [],
            allowedAttributes: {},
        });

        // Adds the sanitization error into the error array of the response obj
        if (clean !== req.body[field])
        {
            response.errors?.push({field: field,message:`Sanitization Error`})
        }
    })


    // Returns all of the sanitization errors for the given field
    if (response.errors?.length !== 0)
    {
        return res.status(400).json(response);
    }

    // If no errors occurred
    next();

}
export default sanitizeRegisterInput;