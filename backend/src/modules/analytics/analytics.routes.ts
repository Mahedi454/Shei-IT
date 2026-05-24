import { Router } from "express";

import { adminAuth } from "../../middlewares/adminAuth";
import { validateBody } from "../../middlewares/validateRequest";
import { getAnalytics, saveAnalytics } from "./analytics.controller";
import { analyticsSettingsSchema } from "./analytics.validation";

const router = Router();

router.get("/", getAnalytics);
router.get("/admin", adminAuth, getAnalytics);
router.post("/admin", adminAuth, validateBody(analyticsSettingsSchema), saveAnalytics);
router.put("/admin", adminAuth, validateBody(analyticsSettingsSchema), saveAnalytics);

export default router;
