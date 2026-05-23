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

export const getPublishedProjects: RequestHandler = catchAsync(async (_req, res) => {
  const projects = await prisma.project.findMany({
    where: { status: "published" },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      image: true,
      categories: true,
      metric: true,
      metricLabel: true,
      featured: true,
      eyebrow: true,
      type: true,
      overview: true,
      primaryOutcome: true,
      delivery: true,
      purpose: true,
      features: true,
      accessRoles: true,
      architectureSteps: true,
      integrationCards: true,
      techStack: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });

  return sendResponse(res, 200, {
    success: true,
    message: "Projects retrieved successfully.",
    data: projects,
  });
});

export const getProjectBySlug: RequestHandler = catchAsync(async (req, res) => {
  const slugParam = String(req.params.slug);
  const project = await prisma.project.findFirst({
    where: {
      slug: slugParam,
      status: "published",
    },
  });

  if (!project) {
    throw new AppError(404, "Project not found.");
  }

  return sendResponse(res, 200, {
    success: true,
    message: "Project retrieved successfully.",
    data: project,
  });
});

export const getAdminProjects: RequestHandler = catchAsync(async (_req, res) => {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return sendResponse(res, 200, {
    success: true,
    message: "Admin projects retrieved successfully.",
    data: projects,
  });
});

export const createProject: RequestHandler = catchAsync(async (req, res) => {
  const slug = req.body.slug ? createSlug(req.body.slug) : createSlug(req.body.title);
  const project = await prisma.project.create({
    data: { ...req.body, slug },
  });

  return sendResponse(res, 201, {
    success: true,
    message: "Project created successfully.",
    data: project,
  });
});

export const updateProject: RequestHandler = catchAsync(async (req, res) => {
  const projectId = String(req.params.id);
  const payload = { ...req.body };

  if (payload.slug) {
    payload.slug = createSlug(payload.slug);
  }

  const existingProject = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!existingProject) {
    throw new AppError(404, "Project not found.");
  }

  const project = await prisma.project.update({
    where: { id: projectId },
    data: payload,
  });

  return sendResponse(res, 200, {
    success: true,
    message: "Project updated successfully.",
    data: project,
  });
});

export const deleteProject: RequestHandler = catchAsync(async (req, res) => {
  const projectId = String(req.params.id);
  const existingProject = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!existingProject) {
    throw new AppError(404, "Project not found.");
  }

  const project = await prisma.project.delete({
    where: { id: projectId },
  });

  return sendResponse(res, 200, {
    success: true,
    message: "Project deleted successfully.",
    data: project,
  });
});
