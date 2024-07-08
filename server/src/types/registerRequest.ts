export interface RegisterFields {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface ErrorResponse {
  timestamp: number;
  message: string;
  code: number;
  errors?: Array<{ field: string; message: string }>;
}

export interface SuccessResponse {
  timestamp: number;
  message: string;
  code: number;
}

export type RegisterResponse = SuccessResponse | ErrorResponse;
