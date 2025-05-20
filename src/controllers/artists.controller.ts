import type { Context } from "hono"
import * as service from "../services/artists.service"

export const listArtists = (c: Context) => {
  const page = Math.max(1, parseInt(c.req.query("page") || "1"))
  const limit = Math.min(100, Math.max(1, parseInt(c.req.query("limit") || "10")))
  const offset = (page - 1) * limit

  const artists = service.getArtists(limit, offset)
  const total = service.getArtistsCount()

  return c.json({
    data: artists,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  })
}

export const getArtist = (c: Context) => {
  const id = c.req.param("id")
  const artist = service.getArtistById(id)
  if (!artist) {
    return c.json({ error: "Artist not found", status: 404 }, 404)
  }
  return c.json(artist)
}

export const createArtist = (c: Context) => {
  const { name } = c.req.valid("json" as never)
  const result = service.createArtist(name)
  return c.json(
    {
      message: "Artist created successfully",
      id: result.lastInsertRowid
    },
    201
  )
}

export const updateArtist = (c: Context) => {
  const id = c.req.param("id")
  const { name } = c.req.valid("json" as never)
  const result = service.updateArtist(id, name)
  if (result.changes === 0) {
    return c.json({ error: "Artist not found", status: 404 }, 404)
  }
  return c.json({
    message: "Artist updated successfully",
    id: id
  })
}

export const deleteArtist = (c: Context) => {
  const id = c.req.param("id")
  const result = service.deleteArtist(id)
  if (result.changes === 0) {
    return c.json({ error: "Artist not found", status: 404 }, 404)
  }
  return c.json({
    message: "Artist deleted successfully",
    id: id
  })
}
