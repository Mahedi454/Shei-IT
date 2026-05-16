import { Router } from "express";

import { adminAuth } from "../../middlewares/adminAuth";
import { getDashboardSummary } from "./dashboard.controller";

const router = Router();

router.get("/summary", adminAuth, getDashboardSummary);

export default router;
