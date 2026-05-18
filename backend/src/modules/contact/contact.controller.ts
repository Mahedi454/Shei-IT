import { RequestHandler } from "express";

import { prisma } from "../../config/prisma";
import { AppError } from "../../utils/AppError";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { sendContactEmail } from "../mail/mail.service";

export const createContact: RequestHandler = catchAsync(async (req, res) => {
  const contact = await prisma.contact.create({
    data: req.body,
  });
  await sendContactEmail(req.body);

  return sendResponse(res, 201, {
    success: true,
    message: "Contact request submitted successfully.",
    data: contact,
  });
});

export const getAdminContacts: RequestHandler = catchAsync(async (_req, res) => {
  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
  });

  return sendResponse(res, 200, {
    success: true,
    message: "Contacts retrieved successfully.",
    data: contacts,
  });
});

export const updateContact: RequestHandler = catchAsync(async (req, res) => {
  const contactId = String(req.params.id);
  const existingContact = await prisma.contact.findUnique({
    where: { id: contactId },
  });

  if (!existingContact) {
    throw new AppError(404, "Contact not found.");
  }

  const contact = await prisma.contact.update({
    where: { id: contactId },
    data: req.body,
  });

  return sendResponse(res, 200, {
    success: true,
    message: "Contact updated successfully.",
    data: contact,
  });
});

export const deleteContact: RequestHandler = catchAsync(async (req, res) => {
  const contactId = String(req.params.id);
  const existingContact = await prisma.contact.findUnique({
    where: { id: contactId },
  });

  if (!existingContact) {
    throw new AppError(404, "Contact not found.");
  }

  const contact = await prisma.contact.delete({
    where: { id: contactId },
  });

  return sendResponse(res, 200, {
    success: true,
    message: "Contact deleted successfully.",
    data: contact,
  });
});
