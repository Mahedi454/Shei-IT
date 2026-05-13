import { RequestHandler } from "express";

import { prisma } from "../../config/prisma";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

export const getDashboardSummary: RequestHandler = catchAsync(async (_req, res) => {
  const [
    blogs,
    publishedBlogs,
    projects,
    publishedProjects,
    contacts,
    newContacts,
    recentContacts,
  ] = await Promise.all([
    prisma.blog.count(),
    prisma.blog.count({ where: { status: "published" } }),
    prisma.project.count(),
    prisma.project.count({ where: { status: "published" } }),
    prisma.contact.count(),
    prisma.contact.count({ where: { status: "new" } }),
    prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  return sendResponse(res, 200, {
    success: true,
    message: "Dashboard summary retrieved successfully.",
    data: {
      counts: {
        blogs,
        publishedBlogs,
        projects,
        publishedProjects,
        contacts,
        newContacts,
      },
      recentContacts,
    },
  });
});
