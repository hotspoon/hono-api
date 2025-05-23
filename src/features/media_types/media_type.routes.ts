import { Hono } from "hono";
import { db } from "@/db/database";

const app = new Hono();

// List all media types
app.get("/", (c) => {
  const mediaTypes = db.query("SELECT * FROM media_types").all();
  return c.json(mediaTypes);
});

// Get media type by ID
app.get("/:id", (c) => {
  const id = c.req.param("id");
  const mediaType = db
    .query("SELECT * FROM media_types WHERE MediaTypeId = ?")
    .get(id);
  if (!mediaType) {
    return c.json({ error: "Media type not found", status: 404 }, 404);
  }
  return c.json(mediaType);
});

export default app;
