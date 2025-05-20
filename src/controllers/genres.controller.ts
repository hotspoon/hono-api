import type { Context } from "hono"
import * as service from "../services/genres.service"

export const listGenres = (c: Context) => {
  const genres = service.getGenres()
  return c.json(genres)
}

export const getGenre = (c: Context) => {
  const id = c.req.param("id")
  const genre = service.getGenreById(id)
  if (!genre) {
    return c.json({ error: "Genre not found", status: 404 }, 404)
  }
  return c.json(genre)
}

export const createGenre = (c: Context) => {
  const { name } = c.req.valid("json" as never)
  const result = service.createGenre(name)
  return c.json(
    {
      message: "Genre created successfully",
      id: result.lastInsertRowid
    },
    201
  )
}

export const updateGenre = (c: Context) => {
  const id = c.req.param("id")
  const { name } = c.req.valid("json" as never)
  const result = service.updateGenre(id, name)
  if (result.changes === 0) {
    return c.json({ error: "Genre not found", status: 404 }, 404)
  }
  return c.json({
    message: "Genre updated successfully",
    id: id
  })
}

export const deleteGenre = (c: Context) => {
  const id = c.req.param("id")
  const result = service.deleteGenre(id)
  if (result.changes === 0) {
    return c.json({ error: "Genre not found", status: 404 }, 404)
  }
  return c.json({
    message: "Genre deleted successfully",
    id: id
  })
}
