import { RequestHandler } from "express";

import { env } from "../config/env";
import { getFirebaseAdmin } from "../config/firebaseAdmin";
import { AppError } from "../utils/AppError";

declare global {
  namespace Express {
    interface Request {
      adminUser?: {
        uid: string;
        email: string;
      };
    }
  }
}

export const adminAuth: RequestHandler = async (req, _res, next) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      throw new AppError(401, "Admin authorization token is required.");
    }

    const decodedToken = await getFirebaseAdmin().auth().verifyIdToken(token);
    const email = decodedToken.email?.toLowerCase();

    if (!email || !env.ADMIN_EMAILS.includes(email)) {
      throw new AppError(403, "You are not allowed to access admin resources.");
    }

    req.adminUser = {
      uid: decodedToken.uid,
      email,
    };

    next();
  } catch (error) {
    next(error);
  }
};
