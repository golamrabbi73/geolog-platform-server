import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import AppError from "./AppError";
import { ErrorRequestHandler } from "express";

const globalErrorHandler: ErrorRequestHandler = (
  error,
  _req,
  res,
  _next
) => {
  let statusCode = 500;
  let message = "Something went wrong.";

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  } else if (
    error instanceof JsonWebTokenError ||
    error instanceof TokenExpiredError
  ) {
    statusCode = 401;
    message =
      error instanceof TokenExpiredError
        ? "Token has expired."
        : "Invalid token.";
  } else if (error instanceof Error) {
    message = error.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default globalErrorHandler;