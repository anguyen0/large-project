import { Request, Response, NextFunction } from 'express';
import RegisterRequestBody from 'src/interfaces/RegisterRequestBody';
import sanitzeHtml, { IOptions } from 'sanitize-html';
import ErrorResponse from 'src/interfaces/ErrorResponse';
import { body, validationResult } from 'express-validator';

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
  const errorResponse: ErrorResponse = {
    timestamp: Date.now(),
    message: 'Sanitization error',
    code: 400,
    fields: {},
  };

  // Check the first name for any HTML tags and/or attributes
  const sanitizeFirstName = sanitzeHtml(first_name, sanitzeOptions);

  if (sanitizeFirstName !== first_name) {
    errorResponse.fields.first_name = ['Invalid first name value'];
  }

  // Check the last name for any HTML tags and/or attributes
  const sanitizeLastName = sanitzeHtml(last_name, sanitzeOptions);

  if (sanitizeLastName !== last_name) {
    errorResponse.fields.last_name = ['Invalid last name value'];
  }

  // Check the username for any HTML tags and/or attributes
  const sanitizeUsername = sanitzeHtml(username, sanitzeOptions);

  if (sanitizeUsername !== username) {
    errorResponse.fields.username = ['Invalid username value'];
  }

  // Check the email for any HTML tags and/or attributes
  const sanitizeEmail = sanitzeHtml(email, sanitzeOptions);

  if (sanitizeEmail !== email) {
    errorResponse.fields.email = ['Invalid email value'];
  }

  // Return error response if a santize error was found
  if (Object.keys(errorResponse.fields).length > 0) {
    return res.status(400).json(errorResponse);
  }

  next();
}

export const validateRegisterInput = [
  // Validate the user's first name input
  body('first_name')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ max: 50 })
    .withMessage('First name cannot exceed 50 characters in length'),

  // Validate the user's last name input
  body('last_name')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ max: 50 })
    .withMessage('Last name cannot exceed 50 characters in length'),

  // Validate the user's username input
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 5, max: 50 })
    .withMessage('First name must be between 5 and 50 characters in length')
    .matches(/^[a-zA-Z_][a-zA-Z0-9_]*$/)
    .withMessage(
      'Username can only contain letters, numbers, and underscores. The first character cannot be a number.'
    ),

  // Validate the user's email input
  body('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Invalid email address format'),

  // Validate the user's password input
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ max: 64 })
    .withMessage('Password cannot exceed 64 characters in length')
    .isStrongPassword()
    .withMessage(
      'Password too weak. Must be at least 8 characters long, and contain 1 uppercase, 1 lowercase, 1 number, and 1 symbol'
    ),

  // Validate the user's password input
  body('confirm_password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ max: 64 })
    .withMessage('Password cannot exceed 64 characters in length')
    .isStrongPassword()
    .withMessage(
      'Password too weak. Must be at least 8 characters long, and contain 1 uppercase, 1 lowercase, 1 number, and 1 symbol'
    )
    .custom((confirm_password, { req }) => {
      if (confirm_password !== req.body['password']) {
        throw new Error('Passwords do not match');
      }

      return true;
    }),

  (
    req: Request<{}, {}, RegisterRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const valdationErrors = validationResult(req);

    if (!valdationErrors.isEmpty()) {
      const errorResponse: ErrorResponse = {
        timestamp: Date.now(),
        message: 'Validation Errors',
        code: 400,
        fields: {},
      };

      // Loop through each error and add it to the appropriate field in the error response
      valdationErrors.array().forEach((error) => {
        if ('path' in error) {
          if (!errorResponse.fields[error.path]) {
            errorResponse.fields[error.path] = [];
          }

          errorResponse.fields[error.path].push(error.msg);
        }
      });

      // If any validation errors occured return a error response
      if (Object.keys(errorResponse.fields).length > 0) {
        return res.status(400).json(errorResponse);
      }
    }

    next();
  },
];
