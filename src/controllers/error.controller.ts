import AppError from "../utils/AppError";

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 404);
};
const handleDuplicateFieldsError = (err) => {
  const message = `${err.keyValue.name} already exists in database, please use another value`;
  return new AppError(message, 400);
};
const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((val: any) => val.message);
  const message = `Invalid input data: ${errors.join("; ")}`;
  return new AppError(message, 422);
};
const handleJsonWebTokenError = (err) => {
  const message = `${err.name}; ${err.message}`;
  return new AppError(message, 401);
};
const handleExpiredJWTError = (err) => {
  const message = `${err.message}! Please login again`;
  return new AppError(message, 401);
};

const sendErrorDev = (err, res, req) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
    data: err.data,
  });
};

const sendErrorProd = (err, res, req) => {
  if (err.isOperational) {
    // OPERATIONAL ERROR, trusted so send appropriate message to the client
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  // PROGRAMMING OR UNKNOWN ERROR, so don't leak error details to the client
  //   1) log error to the console
  console.error("ERROR", err);

  //   2) send a generic message
  return res.status(500).json({
    status: "error",
    message: "Something went wrong",
  });
};

export const handle404Error = (req, res, next) => {
  const err = new AppError(`Can't find ${req.originalUrl} on this server`, 404);
  next(err);
};
export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res, req);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;

    if (err.name === "CastError") error = handleCastErrorDB(err);
    if (err.code === 11000) error = handleDuplicateFieldsError(err);
    if (err.name === "ValidationError") {
      error = handleValidationError(err);
    }
    if (err.name === "JsonWebTokenError") {
      error = handleJsonWebTokenError(err);
    }
    if (err.name === "TokenExpiredError") {
      error = handleExpiredJWTError(err);
    }
    sendErrorProd(error, res, req);
  }
};
