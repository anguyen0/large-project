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

export type CustomResponse = SuccessResponse | ErrorResponse;
