import { Hono } from "hono"
import { authMiddleware } from "../src/middlewares/authMiddleware"
import { errorHandler } from "../src/middlewares/errorHandler"
import { notFoundHandler } from "../src/middlewares/notFoundHandler"
import router from "../src/routes"
import authRoutes from "../src/routes/auth.routes"
import { loggingMiddleware } from "../src/middlewares/loggingMiddleware"

const app = new Hono()

app.notFound(notFoundHandler)
app.onError(errorHandler)

// Use custom logging middleware
app.use("*", loggingMiddleware)

// Public auth routes
app.route("/auth", authRoutes)

app.use("/*", authMiddleware)

app.route("/", router)

app.get("/", (c) =>
  c.json({
    message: "Welcome to the API",
    version: "1.0.0"
  })
)

export default app
