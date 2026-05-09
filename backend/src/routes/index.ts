import { Router } from "express";

import { env } from "../config/env";
import { sendResponse } from "../utils/sendResponse";

const router = Router();

router.get("/health", (_req, res) => {
  return sendResponse(res, 200, {
    success: true,
    message: "Backend is running successfully.",
    data: {
      service: "shei-it-backend",
      environment: env.NODE_ENV,
      port: env.PORT,
      timestamp: new Date().toISOString(),
    },
  });
});

export default router;
