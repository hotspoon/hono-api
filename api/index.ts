import { Hono } from "hono"
import { swaggerUI } from "@hono/swagger-ui"
import { authMiddleware } from "@/middlewares/authMiddleware"
import { errorHandler } from "@/middlewares/errorHandler"
import { notFoundHandler } from "@/middlewares/notFoundHandler"
import { loggingMiddleware } from "@/middlewares/loggingMiddleware"
import router from "@/routes/index"
import authRoutes from "@/features/auth/auth.routes"

const app = new Hono()
  // Middlewares
  .notFound(notFoundHandler)
  .onError(errorHandler)
  // .use("*", loggingMiddleware)

  // Public routes
  .get("/", (c) =>
    c.json({
      message: "Welcome to the API",
      version: "1.0.0"
    })
  )

  .route("/auth", authRoutes)
  // .use("/*", authMiddleware)
  .route("/", router)

export default app
