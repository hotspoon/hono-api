import { db } from "../db/database"

export const getTracks = (limit: number, offset: number) =>
  db.query("SELECT * FROM tracks LIMIT ? OFFSET ?").all(limit, offset)

export const getTracksCount = () =>
  (db.query("SELECT COUNT(*) as count FROM tracks").get() as { count: number }).count

export const getTrackById = (id: string) =>
  db.query("SELECT * FROM tracks WHERE TrackId = ?").get(id)

export const getTracksByAlbum = (albumId: string) =>
  db.query("SELECT * FROM tracks WHERE AlbumId = ?").all(albumId)

export const getTracksByGenre = (genreId: string) =>
  db.query("SELECT * FROM tracks WHERE GenreId = ?").all(genreId)

export const createTrack = (track: any) => {
  const stmt = db.prepare(
    `INSERT INTO tracks (Name, AlbumId, MediaTypeId, GenreId, Composer, Milliseconds, Bytes, UnitPrice)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  )
  return stmt.run(
    track.name,
    track.albumId ?? null,
    track.mediaTypeId,
    track.genreId ?? null,
    track.composer ?? null,
    track.milliseconds,
    track.bytes ?? null,
    track.unitPrice
  )
}

export const updateTrack = (id: string, track: any) => {
  const stmt = db.prepare(
    `UPDATE tracks SET Name = ?, AlbumId = ?, MediaTypeId = ?, GenreId = ?, Composer = ?, Milliseconds = ?, Bytes = ?, UnitPrice = ?
     WHERE TrackId = ?`
  )
  return stmt.run(
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
}

export const deleteTrack = (id: string) => {
  const stmt = db.prepare("DELETE FROM tracks WHERE TrackId = ?")
  return stmt.run(id)
}
