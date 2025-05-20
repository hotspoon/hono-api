import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"
import { trackSchema } from "../schema/tracks"
import * as controller from "../controllers/tracks.controller"

const app = new Hono()

app.get("/", controller.listTracks)
app.get("/:id", controller.getTrack)
app.get("/album/:albumId/tracks", controller.getTracksByAlbum)
app.get("/genre/:genreId/tracks", controller.getTracksByGenre)
app.post("/", zValidator("json", trackSchema), controller.createTrack)
app.put("/:id", zValidator("json", trackSchema), controller.updateTrack)
app.delete("/:id", controller.deleteTrack)

export default app
