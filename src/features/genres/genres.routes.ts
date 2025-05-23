import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { genreSchema } from "@/features/genres/genres.schema";
import * as controller from "@/features/genres/genres.controller";

const app = new Hono();

app.get("/", controller.listGenres);
app.get("/:id", controller.getGenre);
app.post("/", zValidator("json", genreSchema), controller.createGenre);
app.put("/:id", zValidator("json", genreSchema), controller.updateGenre);
app.delete("/:id", controller.deleteGenre);

export default app;
