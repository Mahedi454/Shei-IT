import { Router } from "express";

import { adminAuth } from "../../middlewares/adminAuth";
import { validateBody } from "../../middlewares/validateRequest";
import {
  createBlog,
  deleteBlog,
  getAdminBlogs,
  getBlogBySlug,
  getPublishedBlogs,
  updateBlog,
} from "./blog.controller";
import { createBlogSchema, updateBlogSchema } from "./blog.validation";

const router = Router();

router.get("/admin/all", adminAuth, getAdminBlogs);
router.post("/admin", adminAuth, validateBody(createBlogSchema), createBlog);
router.patch("/admin/:id", adminAuth, validateBody(updateBlogSchema), updateBlog);
router.delete("/admin/:id", adminAuth, deleteBlog);
router.get("/", getPublishedBlogs);
router.get("/:slug", getBlogBySlug);

export default router;
