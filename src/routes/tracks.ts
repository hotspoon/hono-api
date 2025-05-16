import { Hono } from "hono"
import { z } from "zod"
import { zValidator } from "@hono/zod-validator"
import { db } from "../db/database"
import { trackSchema } from "../schema/tracks"

const app = new Hono()

// List all tracks with pagination
app.get("/", (c) => {
  const page = Math.max(1, parseInt(c.req.query("page") || "1"))
  const limit = Math.min(100, Math.max(1, parseInt(c.req.query("limit") || "10")))
  const offset = (page - 1) * limit

  const tracks = db.query("SELECT * FROM tracks LIMIT ? OFFSET ?").all(limit, offset)
  const total = (db.query("SELECT COUNT(*) as count FROM tracks").get() as { count: number }).count

  return c.json({
    data: tracks,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  })
})

// Get track by ID
app.get("/:id", (c) => {
  const id = c.req.param("id")
  const track = db.query("SELECT * FROM tracks WHERE TrackId = ?").get(id)
  if (!track) {
    return c.json({ error: "Track not found", status: 404 }, 404)
  }
  return c.json(track)
})

// Get tracks by album
app.get("/album/:albumId/tracks", (c) => {
  const albumId = c.req.param("albumId")
  const tracks = db.query("SELECT * FROM tracks WHERE AlbumId = ?").all(albumId)
  return c.json(tracks)
})

// Get tracks by genre
app.get("/genre/:genreId/tracks", (c) => {
  const genreId = c.req.param("genreId")
  const tracks = db.query("SELECT * FROM tracks WHERE GenreId = ?").all(genreId)
  return c.json(tracks)
})

// Create new track
app.post("/", zValidator("json", trackSchema), async (c) => {
  const track = c.req.valid("json")
  const stmt = db.prepare(
    `INSERT INTO tracks (Name, AlbumId, MediaTypeId, GenreId, Composer, Milliseconds, Bytes, UnitPrice)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  )
  const result = stmt.run(
    track.name,
    track.albumId ?? null,
    track.mediaTypeId,
    track.genreId ?? null,
    track.composer ?? null,
    track.milliseconds,
    track.bytes ?? null,
    track.unitPrice
  )
  return c.json({ message: "Track created successfully", id: result.lastInsertRowid }, 201)
})

// Update track
app.put("/:id", zValidator("json", trackSchema), async (c) => {
  const id = c.req.param("id")
  const track = c.req.valid("json")
  const stmt = db.prepare(
    `UPDATE tracks SET Name = ?, AlbumId = ?, MediaTypeId = ?, GenreId = ?, Composer = ?, Milliseconds = ?, Bytes = ?, UnitPrice = ?
     WHERE TrackId = ?`
  )
  const result = stmt.run(
    track.name,
    track.albumId ?? null,
    track.mediaTypeId,
    track.genreId ?? null,
    track.composer ?? null,
    track.milliseconds,
    track.bytes ?? null,
    track.unitPrice,
    id
  )
  if (result.changes === 0) {
    return c.json({ error: "Track not found", status: 404 }, 404)
  }
  return c.json({ message: "Track updated successfully", id })
})

// Delete track
app.delete("/:id", (c) => {
  const id = c.req.param("id")
  const stmt = db.prepare("DELETE FROM tracks WHERE TrackId = ?")
  const result = stmt.run(id)
  if (result.changes === 0) {
    return c.json({ error: "Track not found", status: 404 }, 404)
  }
  return c.json({ message: "Track deleted successfully", id })
})

export default app
