export const getHealthPayload = () => ({
  status: "ok",
  uptime: process.uptime(),
  timestamp: new Date().toISOString(),
});
