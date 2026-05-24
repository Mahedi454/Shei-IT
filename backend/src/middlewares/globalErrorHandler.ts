import { Prisma } from "@prisma/client";
import { ErrorRequestHandler } from "express";

import { env } from "../config/env";

export const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  _next,
) => {
  const typedError = error as Error & { statusCode?: number; code?: string };
  let statusCode =
    typedError.statusCode ?? (res.statusCode >= 400 ? res.statusCode : 500);
  let message = typedError.message || "Internal server error";

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2025") {
      statusCode = 404;
      message = "The requested record was not found.";
    } else if (error.code === "P2002") {
      statusCode = 409;
      message = "A record with the same value already exists.";
    } else {
      statusCode = 500;
      message = "Something went wrong on our side. Please try again later.";
    }
  } else if (error instanceof Prisma.PrismaClientInitializationError) {
    statusCode = 503;
    message = "The service is temporarily unavailable. Please try again shortly.";
  } else if (error instanceof Prisma.PrismaClientRustPanicError) {
    statusCode = 500;
    message = "Something went wrong on our side. Please try again later.";
  } else if (statusCode >= 500) {
    message = "Something went wrong on our side. Please try again later.";
  }

  console.error(
    `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`,
    error,
  );

  res.status(statusCode).json({
    success: false,
    message,
    stack: env.NODE_ENV === "development" && statusCode < 500 ? typedError.stack : undefined,
  });
};
