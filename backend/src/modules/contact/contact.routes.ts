import { Router } from "express";

import { adminAuth } from "../../middlewares/adminAuth";
import { validateBody } from "../../middlewares/validateRequest";
import {
  createContact,
  deleteContact,
  getAdminContacts,
  updateContact,
} from "./contact.controller";
import { createContactSchema, updateContactSchema } from "./contact.validation";

const router = Router();

router.post("/", validateBody(createContactSchema), createContact);
router.get("/admin/all", adminAuth, getAdminContacts);
router.patch("/admin/:id", adminAuth, validateBody(updateContactSchema), updateContact);
router.delete("/admin/:id", adminAuth, deleteContact);

export default router;
