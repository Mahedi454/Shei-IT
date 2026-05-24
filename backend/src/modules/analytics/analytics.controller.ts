import { RequestHandler } from "express";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { getAnalyticsSettings, upsertAnalyticsSettings } from "./analytics.service";

export const getAnalytics: RequestHandler = catchAsync(async (_req, res) => {
  const settings = await getAnalyticsSettings();

  return sendResponse(res, 200, {
    success: true,
    message: "Analytics settings retrieved successfully.",
    data: settings,
  });
});

export const saveAnalytics: RequestHandler = catchAsync(async (req, res) => {
  const settings = await upsertAnalyticsSettings(req.body);

  return sendResponse(res, 200, {
    success: true,
    message: "Analytics settings saved successfully.",
    data: settings,
  });
});
