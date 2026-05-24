import { Router } from "express";

import { env } from "../config/env";
import { sendResponse } from "../utils/sendResponse";
import analyticsRoutes from "../modules/analytics/analytics.routes";
import blogRoutes from "../modules/blog/blog.routes";
import contactRoutes from "../modules/contact/contact.routes";
import dashboardRoutes from "../modules/dashboard/dashboard.routes";
import projectRoutes from "../modules/project/project.routes";
import serviceRoutes from "../modules/service/service.routes";
import seoRoutes from "../modules/seo/seo.routes";

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

router.use("/blogs", blogRoutes);
router.use("/projects", projectRoutes);
router.use("/services", serviceRoutes);
router.use("/seo", seoRoutes);
router.use("/analytics-settings", analyticsRoutes);
router.use("/contacts", contactRoutes);
router.use("/admin", dashboardRoutes);

export default router;
