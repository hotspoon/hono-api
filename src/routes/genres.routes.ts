import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"
import { genreSchema } from "../schema/genres"
import * as controller from "../controllers/genres.controller"

const app = new Hono()

app.get("/", controller.listGenres)
app.get("/:id", controller.getGenre)
app.post("/", zValidator("json", genreSchema), controller.createGenre)
app.put("/:id", zValidator("json", genreSchema), controller.updateGenre)
app.delete("/:id", controller.deleteGenre)

export default app
