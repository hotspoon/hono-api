import { Hono } from "hono"
import { handle } from "hono/vercel"

export const config = {
  runtime: "edge"
}

import { logger } from "hono/logger"
import { errorHandler } from "./middlewares/errorHandler"
import { notFoundHandler } from "./middlewares/notFoundHandler"

// router
import router from "./routes"

const app = new Hono()

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

export default handle(app)
