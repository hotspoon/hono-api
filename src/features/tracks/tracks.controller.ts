import type { Context } from "hono"
import * as service from "@/features/tracks/tracks.service"

export const listTracks = (c: Context) => {
  const page = Math.max(1, parseInt(c.req.query("page") || "1"))
  const limit = Math.min(100, Math.max(1, parseInt(c.req.query("limit") || "10")))
  const offset = (page - 1) * limit

  const tracks = service.getTracks(limit, offset)
  const total = service.getTracksCount()

  return c.json({
    data: tracks,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  })
}

export const getTrack = (c: Context) => {
  const id = c.req.param("id")
  const track = service.getTrackById(id)
  if (!track) {
    return c.json({ error: "Track not found", status: 404 }, 404)
  }
  return c.json(track)
}

export const getTracksByAlbum = (c: Context) => {
  const albumId = c.req.param("albumId")
  const tracks = service.getTracksByAlbum(albumId)
  return c.json(tracks)
}

export const getTracksByGenre = (c: Context) => {
  const genreId = c.req.param("genreId")
  const tracks = service.getTracksByGenre(genreId)
  return c.json(tracks)
}

export const createTrack = (c: Context) => {
  const track = c.req.valid("json" as never)
  const result = service.createTrack(track)
  return c.json({ message: "Track created successfully", id: result.lastInsertRowid }, 201)
}

export const updateTrack = (c: Context) => {
  const id = c.req.param("id")
  const track = c.req.valid("json" as never)
  const result = service.updateTrack(id, track)
  if (result.changes === 0) {
    return c.json({ error: "Track not found", status: 404 }, 404)
  }
  return c.json({ message: "Track updated successfully", id })
}

export const deleteTrack = (c: Context) => {
  const id = c.req.param("id")
  const result = service.deleteTrack(id)
  if (result.changes === 0) {
    return c.json({ error: "Track not found", status: 404 }, 404)
  }
  return c.json({ message: "Track deleted successfully", id })
}
