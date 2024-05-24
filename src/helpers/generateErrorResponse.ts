interface CustomError {
  code: number;
  message: string;
}

export interface ErrorResponse {
  success: false;
  error: CustomError;
  status: number;
  data: null;
}

export default function generateErrorResponse(customError: CustomError, status = 400): ErrorResponse {
  return {
    error: customError,
    status,
    success: false,
    data: null,
  }
}