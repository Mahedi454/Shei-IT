import dotenv from "dotenv";

dotenv.config();

const port = Number(process.env.PORT ?? 5000);

if (Number.isNaN(port)) {
  throw new Error("Invalid PORT value in environment configuration.");
}

export const env = {
  PORT: port,
  NODE_ENV: process.env.NODE_ENV ?? "development",
  FRONTEND_URL: process.env.FRONTEND_URL ?? "http://localhost:3000",
};
