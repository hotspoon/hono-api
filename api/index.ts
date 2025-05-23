import { Hono } from "hono";
import { authMiddleware } from "../src/middlewares/authMiddleware";
import { errorHandler } from "../src/middlewares/errorHandler";
import { notFoundHandler } from "../src/middlewares/notFoundHandler";
import router from "../src/routes";
import authRoutes from "../src/routes/auth.routes";
import { loggingMiddleware } from "../src/middlewares/loggingMiddleware";

// Initialize app with chained routes
const app = new Hono()
  // Middlewares
  .notFound(notFoundHandler)
  .onError(errorHandler)
  .use("*", loggingMiddleware)

  // Public routes
  .get("/", (c) =>
    c.json({
      message: "Welcome to the API",
      version: "1.0.0",
    }),
  )
  .route("/auth", authRoutes)
  // Protected routes (authMiddleware applies to /*)
  .use("/*", authMiddleware)
  .route("/", router);

export default app;
