import fs from "node:fs";
import admin from "firebase-admin";

import { env } from "./env";

const getServiceAccount = () => {
  if (!env.FIREBASE_SERVICE_ACCOUNT) {
    return null;
  }

  return JSON.parse(fs.readFileSync(env.FIREBASE_SERVICE_ACCOUNT, "utf8"));
};

export const getFirebaseAdmin = () => {
  if (admin.apps.length) {
    return admin;
  }

  const serviceAccount = getServiceAccount();

  if (!serviceAccount) {
    throw new Error("Firebase Admin credentials are not configured.");
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  return admin;
};
