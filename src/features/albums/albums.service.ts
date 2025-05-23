import { db } from "@/db/database"

export const getAlbums = (limit: number, offset: number) =>
  db.query("SELECT * FROM albums LIMIT ? OFFSET ?").all(limit, offset)

export const getAlbumsCount = () =>
  (db.query("SELECT COUNT(*) as count FROM albums").get() as { count: number }).count

export const getAlbumById = (id: string) =>
  db.query("SELECT * FROM albums WHERE AlbumId = ?").get(id)

export const getAlbumsByArtist = (artistId: string) =>
  db.query("SELECT * FROM albums WHERE ArtistId = ?").all(artistId)

export const albumExists = (title: string, artistId: number) =>
  db.query("SELECT 1 FROM albums WHERE Title = ? AND ArtistId = ?").get(title, artistId)

export const createAlbum = (title: string, artistId: number) => {
  const stmt = db.prepare("INSERT INTO albums (Title, ArtistId) VALUES (?, ?)")
  return stmt.run(title, artistId)
}

export const updateAlbum = (id: string, title: string, artistId: number) => {
  const stmt = db.prepare("UPDATE albums SET Title = ?, ArtistId = ? WHERE AlbumId = ?")
  return stmt.run(title, artistId, id)
}

export const deleteAlbum = (id: string) => {
  const stmt = db.prepare("DELETE FROM albums WHERE AlbumId = ?")
  return stmt.run(id)
}
