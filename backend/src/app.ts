import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { env } from "./config/env";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { notFound } from "./middlewares/notFound";
import routes from "./routes";
import { getHealthPayload } from "./utils/health";

const app = express();
const productionOrigins = ["https://www.shei-it.com", "https://shei-it.com"];
const normalizeOrigin = (origin: string) => origin.replace(/\/$/, "");
const allowedOrigins = new Set(
  [...productionOrigins, ...env.FRONTEND_URLS].map(normalizeOrigin),
);

if (env.NODE_ENV === "development") {
  allowedOrigins.add("http://localhost:3000");
  allowedOrigins.add("http://127.0.0.1:3000");
}

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.has(normalizeOrigin(origin))) {
      callback(null, true);
      return;
    }

    callback(new Error(`CORS origin not allowed: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json(getHealthPayload());
});

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "shei-it backend server is ready.",
  });
});

app.use("/api", routes);

app.use(notFound);
app.use(globalErrorHandler);

export default app;
