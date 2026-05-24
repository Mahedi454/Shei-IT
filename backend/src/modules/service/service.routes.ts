import { Router } from "express";

import { adminAuth } from "../../middlewares/adminAuth";
import { validateBody } from "../../middlewares/validateRequest";
import {
  createService,
  deleteService,
  getAdminServices,
  getPublishedServices,
  getServiceBySlug,
  updateService,
} from "./service.controller";
import { createServiceSchema, updateServiceSchema } from "./service.validation";

const router = Router();

router.get("/admin/all", adminAuth, getAdminServices);
router.post("/admin", adminAuth, validateBody(createServiceSchema), createService);
router.patch("/admin/:id", adminAuth, validateBody(updateServiceSchema), updateService);
router.delete("/admin/:id", adminAuth, deleteService);
router.get("/", getPublishedServices);
router.get("/:slug", getServiceBySlug);

export default router;
