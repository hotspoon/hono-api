import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"
import { albumSchema } from "@/features/albums/albums.schema"
import * as controller from "@/features/albums/albums.controller"

const app = new Hono()

app.get("/", controller.listAlbums)
app.get("/:id", controller.getAlbum)
app.post("/", zValidator("json", albumSchema), controller.createAlbum)
app.get("/artist/:artistId", controller.getAlbumsByArtist)
app.put("/:id", zValidator("json", albumSchema), controller.updateAlbum)
app.delete("/:id", controller.deleteAlbum)

export default app
