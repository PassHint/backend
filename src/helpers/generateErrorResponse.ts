interface CustomError {
  code: number;
  message: string;
}

export type ErrorPayload = {
  success: false;
  error: CustomError;
  data: null;
}

export type ErrorResponse = ErrorPayload & {
  status: number; 
}

export function generateErrorPayload(customError: CustomError): ErrorPayload {
  return {
    error: customError,
    success: false,
    data: null,
  }
}

export default function generateErrorResponse(customError: CustomError, status = 400): ErrorResponse {
  return {
    ...generateErrorPayload(customError),
    status,
  }
}