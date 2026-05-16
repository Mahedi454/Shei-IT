import dotenv from "dotenv";

dotenv.config();

const port = Number(process.env.PORT ?? 5000);
const smtpPort = Number(process.env.SMTP_PORT ?? 587);

if (Number.isNaN(port)) {
  throw new Error("Invalid PORT value in environment configuration.");
}

if (Number.isNaN(smtpPort)) {
  throw new Error("Invalid SMTP_PORT value in environment configuration.");
}

const parseList = (value?: string) =>
  value
    ?.split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean) ?? [];

export const env = {
  PORT: port,
  NODE_ENV: process.env.NODE_ENV ?? "development",
  FRONTEND_URL: process.env.FRONTEND_URL ?? "http://localhost:3000",
  DATABASE_URL: process.env.DATABASE_URL ?? "",
  ADMIN_EMAILS: parseList(process.env.ADMIN_EMAILS),
  FIREBASE_SERVICE_ACCOUNT:
    process.env.FIREBASE_SERVICE_ACCOUNT ?? "./adminsdk.json",
  SMTP_HOST: process.env.SMTP_HOST ?? "",
  SMTP_PORT: smtpPort,
  SMTP_SECURE: process.env.SMTP_SECURE === "true",
  SMTP_USER: process.env.SMTP_USER ?? "",
  SMTP_PASS: process.env.SMTP_PASS ?? "",
  MAIL_FROM: process.env.MAIL_FROM ?? process.env.SMTP_USER ?? "",
  MAIL_TO: parseList(process.env.MAIL_TO),
};
