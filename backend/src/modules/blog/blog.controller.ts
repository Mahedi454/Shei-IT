import { RequestHandler } from "express";

import { prisma } from "../../config/prisma";
import { AppError } from "../../utils/AppError";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { upsertSeoSetting } from "../seo/seo.service";

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
  const seoSettings = await prisma.seoSetting.findMany({
    where: {
      seoableType: "blog",
      seoableId: { in: blogs.map((blog) => blog.id) },
    },
  });
  const seoByBlogId = new Map(seoSettings.map((seo) => [seo.seoableId, seo]));

  return sendResponse(res, 200, {
    success: true,
    message: "Blogs retrieved successfully.",
    data: blogs.map((blog) => ({ ...blog, seo: seoByBlogId.get(blog.id) ?? null })),
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
  const seo = await prisma.seoSetting.findUnique({
    where: {
      seoableType_seoableId: {
        seoableType: "blog",
        seoableId: blog.id,
      },
    },
  });

  return sendResponse(res, 200, {
    success: true,
    message: "Blog retrieved successfully.",
    data: { ...blog, seo },
  });
});

export const getAdminBlogs: RequestHandler = catchAsync(async (_req, res) => {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  });
  const seoSettings = await prisma.seoSetting.findMany({
    where: {
      seoableType: "blog",
      seoableId: { in: blogs.map((blog) => blog.id) },
    },
  });
  const seoByBlogId = new Map(seoSettings.map((seo) => [seo.seoableId, seo]));

  return sendResponse(res, 200, {
    success: true,
    message: "Admin blogs retrieved successfully.",
    data: blogs.map((blog) => ({ ...blog, seo: seoByBlogId.get(blog.id) ?? null })),
  });
});

export const createBlog: RequestHandler = catchAsync(async (req, res) => {
  const { seo, ...blogPayload } = req.body;
  const slug = req.body.slug ? createSlug(req.body.slug) : createSlug(req.body.title);
  const blog = await prisma.blog.create({
    data: {
      ...blogPayload,
      slug,
      category: blogPayload.category || "General",
      authorName: blogPayload.authorName || "Shei IT Team",
      publishedAt: blogPayload.status === "published" ? new Date() : undefined,
    },
  });
  const seoSetting = seo
    ? await upsertSeoSetting({
        ...seo,
        seoableType: "blog",
        seoableId: blog.id,
        slug: seo.slug || blog.slug,
        metaTitle: seo.metaTitle || blog.title,
        metaDescription: seo.metaDescription || blog.excerpt,
        ogTitle: seo.ogTitle || seo.metaTitle || blog.title,
        ogDescription: seo.ogDescription || seo.metaDescription || blog.excerpt,
        ogImage: seo.ogImage || blog.coverImage,
      })
    : null;

  return sendResponse(res, 201, {
    success: true,
    message: "Blog created successfully.",
    data: { ...blog, seo: seoSetting },
  });
});

export const updateBlog: RequestHandler = catchAsync(async (req, res) => {
  const blogId = String(req.params.id);
  const { seo, ...payload } = req.body;

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
  const seoSetting = seo
    ? await upsertSeoSetting({
        ...seo,
        seoableType: "blog",
        seoableId: blog.id,
        slug: seo.slug || blog.slug,
        metaTitle: seo.metaTitle || blog.title,
        metaDescription: seo.metaDescription || blog.excerpt,
        ogTitle: seo.ogTitle || seo.metaTitle || blog.title,
        ogDescription: seo.ogDescription || seo.metaDescription || blog.excerpt,
        ogImage: seo.ogImage || blog.coverImage,
      })
    : await prisma.seoSetting.findUnique({
        where: {
          seoableType_seoableId: {
            seoableType: "blog",
            seoableId: blog.id,
          },
        },
      });

  return sendResponse(res, 200, {
    success: true,
    message: "Blog updated successfully.",
    data: { ...blog, seo: seoSetting },
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
