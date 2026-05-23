import { RequestHandler } from "express";

import { prisma } from "../../config/prisma";
import { AppError } from "../../utils/AppError";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const getPublishedBlogs: RequestHandler = catchAsync(async (_req, res) => {
  const blogs = await prisma.blog.findMany({
    where: { status: "published" },
    orderBy: [{ featured: "desc" }, { publishedAt: "desc" }, { createdAt: "desc" }],
  });

  return sendResponse(res, 200, {
    success: true,
    message: "Blogs retrieved successfully.",
    data: blogs,
  });
});

export const getBlogBySlug: RequestHandler = catchAsync(async (req, res) => {
  const slugParam = String(req.params.slug);
  const blog = await prisma.blog.findFirst({
    where: {
      slug: slugParam,
      status: "published",
    },
  });

  if (!blog) {
    throw new AppError(404, "Blog not found.");
  }

  return sendResponse(res, 200, {
    success: true,
    message: "Blog retrieved successfully.",
    data: blog,
  });
});

export const getAdminBlogs: RequestHandler = catchAsync(async (_req, res) => {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  });

  return sendResponse(res, 200, {
    success: true,
    message: "Admin blogs retrieved successfully.",
    data: blogs,
  });
});

export const createBlog: RequestHandler = catchAsync(async (req, res) => {
  const slug = req.body.slug ? createSlug(req.body.slug) : createSlug(req.body.title);
  const blog = await prisma.blog.create({
    data: {
      ...req.body,
      slug,
      category: req.body.category || "General",
      authorName: req.body.authorName || "Shei IT Team",
      publishedAt: req.body.status === "published" ? new Date() : undefined,
    },
  });

  return sendResponse(res, 201, {
    success: true,
    message: "Blog created successfully.",
    data: blog,
  });
});

export const updateBlog: RequestHandler = catchAsync(async (req, res) => {
  const blogId = String(req.params.id);
  const payload = { ...req.body };

  if (payload.slug) {
    payload.slug = createSlug(payload.slug);
  }

  const existingBlog = await prisma.blog.findUnique({
    where: { id: blogId },
  });

  if (!existingBlog) {
    throw new AppError(404, "Blog not found.");
  }

  if (payload.status === "published") {
    payload.publishedAt = existingBlog.publishedAt ?? new Date();
  }

  if (payload.status === "draft") {
    payload.publishedAt = null;
  }

  if (payload.authorName === "") {
    payload.authorName = "Shei IT Team";
  }

  if (payload.category === "") {
    payload.category = "General";
  }

  const blog = await prisma.blog.update({
    where: { id: blogId },
    data: payload,
  });

  return sendResponse(res, 200, {
    success: true,
    message: "Blog updated successfully.",
    data: blog,
  });
});

export const deleteBlog: RequestHandler = catchAsync(async (req, res) => {
  const blogId = String(req.params.id);
  const existingBlog = await prisma.blog.findUnique({
    where: { id: blogId },
  });

  if (!existingBlog) {
    throw new AppError(404, "Blog not found.");
  }

  const blog = await prisma.blog.delete({
    where: { id: blogId },
  });

  return sendResponse(res, 200, {
    success: true,
    message: "Blog deleted successfully.",
    data: blog,
  });
});
