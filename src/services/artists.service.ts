import { db } from "../db/database"

export const getArtists = (limit: number, offset: number) =>
  db.query("SELECT * FROM artists LIMIT ? OFFSET ?").all(limit, offset)

export const getArtistsCount = () =>
  (db.query("SELECT COUNT(*) as count FROM artists").get() as { count: number }).count

export const getArtistById = (id: string) =>
  db.query("SELECT * FROM artists WHERE ArtistId = ?").get(id)

export const createArtist = (name: string) => {
  const stmt = db.prepare("INSERT INTO artists (name) VALUES (?)")
  return stmt.run(name)
}

export const updateArtist = (id: string, name: string) => {
  const stmt = db.prepare("UPDATE artists SET Name = ? WHERE ArtistId = ?")
  return stmt.run(name, id)
}

export const deleteArtist = (id: string) => {
  const stmt = db.prepare("DELETE FROM artists WHERE ArtistId = ?")
  return stmt.run(id)
}
