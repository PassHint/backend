export interface SuccessResponse<T = any> {
  success: true;
  error: null;
  status: number;
  data: T;
}

export default function generateSuccessResponse<T>(data: T, status = 200): SuccessResponse<T> {
  return {
    success: true,
    status,
    data,
    error: null,
  }
}