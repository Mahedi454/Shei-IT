import fs from "node:fs";
import path from "node:path";
import admin from "firebase-admin";

import { env } from "./env";

const backendRoot = path.resolve(__dirname, "../..");

const getServiceAccount = () => {
  if (!env.FIREBASE_SERVICE_ACCOUNT) {
    return null;
  }

  const serviceAccountPath = path.isAbsolute(env.FIREBASE_SERVICE_ACCOUNT)
    ? env.FIREBASE_SERVICE_ACCOUNT
    : path.resolve(backendRoot, env.FIREBASE_SERVICE_ACCOUNT);

  return JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));
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
