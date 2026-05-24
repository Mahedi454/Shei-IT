import { RequestHandler } from "express";

import { prisma } from "../../config/prisma";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { upsertSeoSetting } from "./seo.service";

export const getSeoSetting: RequestHandler = catchAsync(async (req, res) => {
  const seo = await prisma.seoSetting.findUnique({
    where: {
      seoableType_seoableId: {
        seoableType: String(req.params.type),
        seoableId: String(req.params.id),
      },
    },
  });

  return sendResponse(res, 200, {
    success: true,
    message: "SEO setting retrieved successfully.",
    data: seo,
  });
});

export const getAdminSeoSettings: RequestHandler = catchAsync(async (_req, res) => {
  const settings = await prisma.seoSetting.findMany({
    orderBy: [{ seoableType: "asc" }, { seoableId: "asc" }],
  });

  return sendResponse(res, 200, {
    success: true,
    message: "SEO settings retrieved successfully.",
    data: settings,
  });
});

export const upsertAdminSeoSetting: RequestHandler = catchAsync(async (req, res) => {
  const seo = await upsertSeoSetting(req.body);

  return sendResponse(res, 200, {
    success: true,
    message: "SEO setting saved successfully.",
    data: seo,
  });
});

export const deleteAdminSeoSetting: RequestHandler = catchAsync(async (req, res) => {
  await prisma.seoSetting.deleteMany({
    where: {
      seoableType: String(req.params.type),
      seoableId: String(req.params.id),
    },
  });

  return sendResponse(res, 200, {
    success: true,
    message: "SEO setting removed successfully.",
    data: null,
  });
});
