import { describe, it, expect } from "bun:test"
import app from "~/api/index"

describe("Playlists API", () => {
  let playlistId: number
  let trackId: number = 1 // Use a valid TrackId from your DB

  it("should list playlists", async () => {
    const res = await app.request("/playlists")
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(Array.isArray(json)).toBe(true)
  })

  it("should create a playlist", async () => {
    const res = await app.request("/playlists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Test Playlist" })
    })
    expect(res.status).toBe(201)
    const json = await res.json()
    expect(json).toHaveProperty("id")
    playlistId = json.id
  })

  it("should get the created playlist", async () => {
    const res = await app.request(`/playlists/${playlistId}`)
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toHaveProperty("PlaylistId", playlistId)
    expect(json).toHaveProperty("Name", "Test Playlist")
  })

  it("should update the playlist", async () => {
    const res = await app.request(`/playlists/${playlistId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Updated Playlist" })
    })
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toHaveProperty("message", "Playlist updated successfully")
  })

  it("should add a track to the playlist", async () => {
    const res = await app.request(`/playlists/${playlistId}/tracks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ trackId: String(trackId) })
    })
    expect(res.status).toBe(201)
    const json = await res.json()
    expect(json).toHaveProperty("message", "Track added to playlist")
  })

  it("should list tracks in the playlist", async () => {
    const res = await app.request(`/playlists/${playlistId}/tracks`)
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(Array.isArray(json)).toBe(true)
  })

  it("should remove a track from the playlist", async () => {
    const res = await app.request(`/playlists/${playlistId}/tracks/${trackId}`, {
      method: "DELETE"
    })
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toHaveProperty("message", "Track removed from playlist")
  })

  it("should delete the playlist", async () => {
    const res = await app.request(`/playlists/${playlistId}`, {
      method: "DELETE"
    })
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toHaveProperty("message", "Playlist deleted successfully")
  })

  it("should return 404 for deleted playlist", async () => {
    const res = await app.request(`/playlists/${playlistId}`)
    expect(res.status).toBe(404)
  })
})
