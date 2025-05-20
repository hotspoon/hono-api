import { db } from "../db/database"

export const getPlaylists = () => db.query("SELECT * FROM playlists").all()

export const getPlaylistById = (id: string) =>
  db.query("SELECT * FROM playlists WHERE PlaylistId = ?").get(id)

export const createPlaylist = (playlist: any) => {
  const stmt = db.prepare(`INSERT INTO playlists (Name) VALUES (?)`)
  return stmt.run(playlist.name)
}

export const updatePlaylist = (id: string, playlist: any) => {
  const stmt = db.prepare(`UPDATE playlists SET Name = ? WHERE PlaylistId = ?`)
  return stmt.run(playlist.name, id)
}

export const deletePlaylist = (id: string) => {
  const stmt = db.prepare("DELETE FROM playlists WHERE PlaylistId = ?")
  return stmt.run(id)
}

export const getPlaylistTracks = (id: string) =>
  db
    .query(
      `SELECT tracks.* FROM tracks
     JOIN playlist_track ON tracks.TrackId = playlist_track.TrackId
     WHERE playlist_track.PlaylistId = ?`
    )
    .all(id)

export const addTrackToPlaylist = (playlistId: string, trackId: string) => {
  const stmt = db.prepare(`INSERT INTO playlist_track (PlaylistId, TrackId) VALUES (?, ?)`)
  return stmt.run(playlistId, trackId)
}

export const removeTrackFromPlaylist = (playlistId: string, trackId: string) => {
  const stmt = db.prepare(`DELETE FROM playlist_track WHERE PlaylistId = ? AND TrackId = ?`)
  return stmt.run(playlistId, trackId)
}
