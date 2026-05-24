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

export const getPublishedServices: RequestHandler = catchAsync(async (_req, res) => {
  const services = await prisma.service.findMany({
    where: { status: "published" },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });

  return sendResponse(res, 200, {
    success: true,
    message: "Services retrieved successfully.",
    data: services,
  });
});

export const getServiceBySlug: RequestHandler = catchAsync(async (req, res) => {
  const slugParam = String(req.params.slug);
  const service = await prisma.service.findFirst({
    where: {
      slug: slugParam,
      status: "published",
    },
  });

  if (!service) {
    throw new AppError(404, "Service not found.");
  }

  return sendResponse(res, 200, {
    success: true,
    message: "Service retrieved successfully.",
    data: service,
  });
});

export const getAdminServices: RequestHandler = catchAsync(async (_req, res) => {
  const services = await prisma.service.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });

  return sendResponse(res, 200, {
    success: true,
    message: "Admin services retrieved successfully.",
    data: services,
  });
});

export const createService: RequestHandler = catchAsync(async (req, res) => {
  const slug = req.body.slug ? createSlug(req.body.slug) : createSlug(req.body.title);
  const service = await prisma.service.create({
    data: {
      ...req.body,
      slug,
      heroImageUrl: req.body.heroImageUrl || null,
    },
  });

  return sendResponse(res, 201, {
    success: true,
    message: "Service created successfully.",
    data: service,
  });
});

export const updateService: RequestHandler = catchAsync(async (req, res) => {
  const serviceId = String(req.params.id);
  const payload = { ...req.body };

  if (payload.slug) {
    payload.slug = createSlug(payload.slug);
  }

  if ("heroImageUrl" in payload && !payload.heroImageUrl) {
    payload.heroImageUrl = null;
  }

  const existingService = await prisma.service.findUnique({
    where: { id: serviceId },
  });

  if (!existingService) {
    throw new AppError(404, "Service not found.");
  }

  const service = await prisma.service.update({
    where: { id: serviceId },
    data: payload,
  });

  return sendResponse(res, 200, {
    success: true,
    message: "Service updated successfully.",
    data: service,
  });
});

export const deleteService: RequestHandler = catchAsync(async (req, res) => {
  const serviceId = String(req.params.id);
  const existingService = await prisma.service.findUnique({
    where: { id: serviceId },
  });

  if (!existingService) {
    throw new AppError(404, "Service not found.");
  }

  const service = await prisma.service.delete({
    where: { id: serviceId },
  });

  return sendResponse(res, 200, {
    success: true,
    message: "Service deleted successfully.",
    data: service,
  });
});
