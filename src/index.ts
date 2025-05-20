import { Hono } from "hono"
import { handle } from "hono/vercel"
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

export default handle(app)
