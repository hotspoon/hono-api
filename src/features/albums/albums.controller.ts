import * as service from "@/features/albums/albums.service"

import { Context } from "hono"

export const listAlbums = (c: Context) => {
  const page = Math.max(1, parseInt(c.req.query("page") || "1"))
  const limit = Math.min(100, Math.max(1, parseInt(c.req.query("limit") || "10")))
  const offset = (page - 1) * limit

  const albums = service.getAlbums(limit, offset)
  const total = service.getAlbumsCount()

  return c.json({
    data: albums,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  })
}

export const getAlbum = (c: Context) => {
  const id = c.req.param("id")
  const album = service.getAlbumById(id)
  if (!album) {
    return c.json({ error: "Album not found", status: 404 }, 404)
  }
  return c.json(album)
}

export const createAlbum = (c: Context) => {
  const { title, artisid } = c.req.valid("json" as never)
  const exists = service.albumExists(title, artisid)
  if (exists) {
    return c.json(
      { error: "Album with this title already exists for the artist", status: 409 },
      409
    )
  }
  const result = service.createAlbum(title, artisid)
  return c.json(
    {
      message: "Album created successfully",
      id: result.lastInsertRowid
    },
    201
  )
}

export const getAlbumsByArtist = (c: Context) => {
  const artistId = c.req.param("artistId")
  const albums = service.getAlbumsByArtist(artistId)
  return c.json(albums)
}

export const updateAlbum = (c: Context) => {
  const id = c.req.param("id")
  const { title, artisid } = c.req.valid("json" as never)
  const result = service.updateAlbum(id, title, artisid)
  if (result.changes === 0) {
    return c.json({ error: "Album not found", status: 404 }, 404)
  }
  return c.json({
    message: "Album updated successfully",
    id: id
  })
}

export const deleteAlbum = (c: Context) => {
  const id = c.req.param("id")
  const result = service.deleteAlbum(id)
  if (result.changes === 0) {
    return c.json({ error: "Album not found", status: 404 }, 404)
  }
  return c.json({
    message: "Album deleted successfully",
    id: id
  })
}
