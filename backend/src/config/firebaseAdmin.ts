import fs from "node:fs";
import admin from "firebase-admin";

import { env } from "./env";

const getServiceAccount = () => {
  if (env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    return JSON.parse(env.FIREBASE_SERVICE_ACCOUNT_JSON);
  }

  if (env.FIREBASE_SERVICE_ACCOUNT_PATH) {
    return JSON.parse(fs.readFileSync(env.FIREBASE_SERVICE_ACCOUNT_PATH, "utf8"));
  }

  if (
    env.FIREBASE_PROJECT_ID &&
    env.FIREBASE_CLIENT_EMAIL &&
    env.FIREBASE_PRIVATE_KEY
  ) {
    return {
      projectId: env.FIREBASE_PROJECT_ID,
      clientEmail: env.FIREBASE_CLIENT_EMAIL,
      privateKey: env.FIREBASE_PRIVATE_KEY,
    };
  }

  return null;
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
