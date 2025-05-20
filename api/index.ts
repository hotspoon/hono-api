import { Hono } from "hono"
import { serve } from "@hono/node-server"

import { logger } from "hono/logger"
import { errorHandler } from "../src/middlewares/errorHandler"
import { notFoundHandler } from "../src/middlewares/notFoundHandler"

// router
import router from "../src/routes"

const app = new Hono().basePath("/api")

// not found handler
app.notFound(notFoundHandler)
// error handler
app.onError(errorHandler)

app.use(logger())
app.route("/", router)

app.get("/", (c) =>
  c.json({
    message: "Welcome to the API",
    version: "1.0.0"
  })
)

const server = serve(app)

// graceful shutdown
process.on("SIGINT", () => {
  server.close()
  process.exit(0)
})
process.on("SIGTERM", () => {
  server.close((err) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    process.exit(0)
  })
})
