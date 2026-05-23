import { Router } from "express";

import { adminAuth } from "../../middlewares/adminAuth";
import { validateBody } from "../../middlewares/validateRequest";
import { getAdminSeoSettings, getSeoSetting, upsertAdminSeoSetting } from "./seo.controller";
import { upsertSeoSchema } from "./seo.validation";

const router = Router();

router.get("/admin/all", adminAuth, getAdminSeoSettings);
router.put("/admin", adminAuth, validateBody(upsertSeoSchema), upsertAdminSeoSetting);
router.get("/:type/:id", getSeoSetting);

export default router;
