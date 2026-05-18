import { Router } from "express";

import { adminAuth } from "../../middlewares/adminAuth";
import { validateBody } from "../../middlewares/validateRequest";
import {
  createProject,
  deleteProject,
  getAdminProjects,
  getProjectBySlug,
  getPublishedProjects,
  updateProject,
} from "./project.controller";
import { createProjectSchema, updateProjectSchema } from "./project.validation";

const router = Router();

router.get("/admin/all", adminAuth, getAdminProjects);
router.post("/admin", adminAuth, validateBody(createProjectSchema), createProject);
router.patch("/admin/:id", adminAuth, validateBody(updateProjectSchema), updateProject);
router.delete("/admin/:id", adminAuth, deleteProject);
router.get("/", getPublishedProjects);
router.get("/:slug", getProjectBySlug);

export default router;
