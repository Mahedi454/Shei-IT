import { RequestHandler } from "express";
import { z } from "zod";

export const validateBody =
  (schema: z.ZodType): RequestHandler =>
  (req, _res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const error = new Error(
        result.error.issues.map((issue) => issue.message).join(", "),
      ) as Error & { statusCode?: number };
      error.statusCode = 400;
      next(error);
      return;
    }

    req.body = result.data;
    next();
  };
