import { ErrorRequestHandler } from "express";

import { env } from "../config/env";

export const globalErrorHandler: ErrorRequestHandler = (
  error,
  _req,
  res,
  _next,
) => {
  const typedError = error as Error & { statusCode?: number };
  const statusCode =
    typedError.statusCode ?? (res.statusCode >= 400 ? res.statusCode : 500);

  res.status(statusCode).json({
    success: false,
    message: typedError.message || "Internal server error",
    stack: env.NODE_ENV === "development" ? typedError.stack : undefined,
  });
};
