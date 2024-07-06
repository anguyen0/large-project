import { Request, Response, NextFunction } from 'express';
import RegisterRequestBody from 'src/interfaces/RegisterRequestBody';
import sanitzeHtml, { IOptions } from 'sanitize-html';
import ErrorResponse from 'src/interfaces/ErrorResponse';

export function sanitizeRegisterInput(
  req: Request<{}, {}, RegisterRequestBody>,
  res: Response,
  next: NextFunction
) {
  // Extract the fields that need to be sanitized from the requst body
  const { first_name, last_name, username, email }: RegisterRequestBody =
    req.body;

  // Configure sanitze options
  const sanitzeOptions: IOptions = {
    allowedTags: [],
    allowedAttributes: {},
  };

  // Create list to hold any santization errors that may occur
  const errors: ErrorResponse = {
    timestamp: Date.now(),
    message: 'Sanitization error',
    code: 400,
    fields: [],
  };

  // Check the first name for any HTML tags and/or attributes
  const sanitizeFirstName = sanitzeHtml(first_name, sanitzeOptions);

  if (sanitizeFirstName !== first_name) {
    errors.fields.push('first_name');
  }

  // Check the last name for any HTML tags and/or attributes
  const sanitizeLastName = sanitzeHtml(last_name, sanitzeOptions);

  if (sanitizeLastName !== last_name) {
    errors.fields.push('last_name');
  }

  // Check the username for any HTML tags and/or attributes
  const sanitizeUsername = sanitzeHtml(username, sanitzeOptions);

  if (sanitizeUsername !== username) {
    errors.fields.push('username');
  }

  // Check the email for any HTML tags and/or attributes
  const sanitizeEmail = sanitzeHtml(email, sanitzeOptions);

  if (sanitizeEmail !== email) {
    errors.fields.push('email');
  }

  // If the fields array length is not 0 then a error occured
  if (errors.fields.length > 0) {
    return res.status(400).json(errors);
  }

  next();
}

export function validateRegisterInput(
  req: Request,
  res: Response,
  next: NextFunction
) {}
