import type { MiddlewareHandler } from "hono";
import { getWibDateTime } from "@/utils/format-time";
import { logger as pinoLogger } from "@/utils/logger";

export const loggingMiddleware: MiddlewareHandler = async (c, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  const req = c.req;
  const res = c.res;

  const wibTime = getWibDateTime();

  // Console log (optional, for development)
  console.log(`[${wibTime}] ${req.method} ${req.path} ${res.status} - ${ms}ms`);

  // Pino log (for file or production)
  pinoLogger.info({
    time: wibTime,
    method: req.method,
    path: req.path,
    status: res.status,
    duration: `${ms}ms`,
  });
};
