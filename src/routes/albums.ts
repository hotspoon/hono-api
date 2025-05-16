import { Hono } from "hono"
import { z } from "zod"
import { zValidator } from "@hono/zod-validator"
import { db } from "../db/database"
import { albumSchema } from "../schema/albums"

const app = new Hono()

// List all albums with pagination
app.get("/", (c) => {
  const page = Math.max(1, parseInt(c.req.query("page") || "1")) // Default to page 1, min 1
  const limit = Math.min(100, Math.max(1, parseInt(c.req.query("limit") || "10"))) // Default 10, max 100
  const offset = (page - 1) * limit

  const albums = db.query("SELECT * FROM albums LIMIT ? OFFSET ?").all(limit, offset)
  const total = (db.query("SELECT COUNT(*) as count FROM albums").get() as { count: number }).count

  return c.json({
    data: albums,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  })
})

// Get album by ID
app.get("/:id", (c) => {
  const id = c.req.param("id")
  const album = db.query("SELECT * FROM albums WHERE AlbumId = ?").get(id)
  if (!album) {
    return c.json({ error: "Album not found", status: 404 }, 404)
  }
  return c.json(album)
})

// Create new album
app.post("/", zValidator("json", albumSchema), async (c) => {
  const { title, artisid } = c.req.valid("json")

  // Check for duplicate
  const exists = db
    .query("SELECT 1 FROM albums WHERE Title = ? AND ArtistId = ?")
    .get(title, artisid)

  if (exists) {
    return c.json(
      { error: "Album with this title already exists for the artist", status: 409 },
      409
    )
  }

  const stmt = db.prepare("INSERT INTO albums (Title, ArtistId) VALUES (?, ?)")
  const result = stmt.run(title, artisid)
  return c.json(
    {
      message: "Album created successfully",
      id: result.lastInsertRowid
    },
    201
  )
})

// Get albums by artist
app.get("/artist/:artistId", (c) => {
  const artistId = c.req.param("artistId")
  const albums = db.query("SELECT * FROM albums WHERE ArtistId = ?").all(artistId)
  return c.json(albums)
})

// Update album
app.put("/:id", zValidator("json", albumSchema), async (c) => {
  const id = c.req.param("id")
  const { title, artisid } = c.req.valid("json")
  const stmt = db.prepare("UPDATE albums SET Title = ?, ArtistId = ? WHERE AlbumId = ?")
  const result = stmt.run(title, artisid, id)
  if (result.changes === 0) {
    return c.json({ error: "Album not found", status: 404 }, 404)
  }
  return c.json({
    message: "Album updated successfully",
    id: id
  })
})

// Delete album
app.delete("/:id", (c) => {
  const id = c.req.param("id")
  const stmt = db.prepare("DELETE FROM albums WHERE AlbumId = ?")
  const result = stmt.run(id)
  if (result.changes === 0) {
    return c.json({ error: "Album not found", status: 404 }, 404)
  }
  return c.json({
    message: "Album deleted successfully",
    id: id
  })
})

export default app
