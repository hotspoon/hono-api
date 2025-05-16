import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"
import { db } from "../db/database"
import { ArtistSchema } from "../schema/artists"

const app = new Hono()

// Read all with pagination (GET)
app.get("/", (c) => {
  const page = Math.max(1, parseInt(c.req.query("page") || "1")) // Ensure page is at least 1
  const limit = Math.min(100, Math.max(1, parseInt(c.req.query("limit") || "10"))) // Max 100 items per page
  const offset = (page - 1) * limit

  const artists = db.query("SELECT * FROM artists LIMIT ? OFFSET ?").all(limit, offset)
  const total = (db.query("SELECT COUNT(*) as count FROM artists").get() as { count: number }).count

  return c.json({
    data: artists,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  })
})

// Read one (GET)
app.get("/:id", (c) => {
  const id = c.req.param("id")

  const artist = db.query("SELECT * FROM artists WHERE ArtistId = ?").get(id)

  if (!artist) {
    return c.json(
      {
        error: "Artist not found",
        status: 404
      },
      404
    )
  }

  return c.json(artist)
})

// Create (POST)
app.post("/", zValidator("json", ArtistSchema), async (c) => {
  const { name } = c.req.valid("json")

  const stmt = db.prepare("INSERT INTO artists (name) VALUES (?)")
  const result = stmt.run(name)

  return c.json(
    {
      message: "Artist created successfully",
      id: result.lastInsertRowid
    },
    201
  )
})

// Update (PUT)
app.put("/:id", zValidator("json", ArtistSchema), async (c) => {
  const id = c.req.param("id")
  const { name } = c.req.valid("json")

  const stmt = db.prepare("UPDATE artists SET Name = ? WHERE ArtistId = ?")
  const result = stmt.run(name, id)

  if (result.changes === 0) {
    return c.json(
      {
        error: "Artist not found",
        status: 404
      },
      404
    )
  }

  return c.json({
    message: "Artist updated successfully",
    id: id
  })
})

// Delete (DELETE)
app.delete("/:id", (c) => {
  const id = c.req.param("id")

  const stmt = db.prepare("DELETE FROM artists WHERE ArtistId = ?")
  const result = stmt.run(id)

  if (result.changes === 0) {
    return c.json(
      {
        error: "Artist not found",
        status: 404
      },
      404
    )
  }

  return c.json({
    message: "Artist deleted successfully",
    id: id
  })
})

export default app
