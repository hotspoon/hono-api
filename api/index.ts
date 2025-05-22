import { Hono } from "hono"
import { logger } from "hono/logger"
import { authMiddleware } from "../src/middlewares/authMiddleware"
import { errorHandler } from "../src/middlewares/errorHandler"
import { notFoundHandler } from "../src/middlewares/notFoundHandler"
import router from "../src/routes"
import authRoutes from "../src/routes/auth.routes"

const app = new Hono()

app.notFound(notFoundHandler)
app.onError(errorHandler)
app.use(logger())

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
