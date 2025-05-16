import { Hono } from "hono"
import { logger } from "hono/logger"
import { errorHandler } from "./middlewares/errorHandler"
import { notFoundHandler } from "./middlewares/notFoundHandler"

// router
import artistRouter from "./routes/artists"
import albumRouter from "./routes/albums"
import trackRouter from "./routes/tracks"

const app = new Hono()

// not found handler
app.notFound(notFoundHandler)
// error handler
app.onError(errorHandler)

app.use(logger())
app.route("/artists", artistRouter)
app.route("/albums", albumRouter)
app.route("/tracks", trackRouter)

export default app
