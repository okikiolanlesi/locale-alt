class AppError extends Error {
  statusCode: string;
  status: string;
  isOperational: boolean;
  constructor(message, statusCode, data = null) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
export default AppError;
