import app from "./app";
import { env } from "./config/env";
import { prisma } from "./config/prisma";

const bootstrap = async () => {
  if (!env.DATABASE_URL) {
    console.warn("DATABASE_URL is missing. Prisma-backed routes will fail.");
  } else {
    await prisma.$connect();
    console.log("PostgreSQL connected.");
  }

  app.listen(env.PORT, () => {
    console.log(
      `shei-it backend is running on http://localhost:${env.PORT} in ${env.NODE_ENV} mode`,
    );
  });
};

bootstrap().catch((error) => {
  console.error("Failed to start shei-it backend.", error);
  process.exit(1);
});
