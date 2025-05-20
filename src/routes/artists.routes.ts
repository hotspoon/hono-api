import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"
import { ArtistSchema } from "../schema/artists"
import * as controller from "../controllers/artists.controller"

const app = new Hono()

app.get("/", controller.listArtists)
app.get("/:id", controller.getArtist)
app.post("/", zValidator("json", ArtistSchema), controller.createArtist)
app.put("/:id", zValidator("json", ArtistSchema), controller.updateArtist)
app.delete("/:id", controller.deleteArtist)

export default app
