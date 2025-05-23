import { describe, it, expect } from "bun:test"
import app from "~/api/index"

describe("Tracks API", () => {
  let createdId: number
  const testAlbumId = 1 // Use a valid AlbumId from your DB
  const testMediaTypeId = 1 // Use a valid MediaTypeId from your DB
  const testGenreId = 1 // Use a valid GenreId from your DB

  it("should list tracks", async () => {
    const res = await app.request("/tracks")
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toHaveProperty("data")
    expect(Array.isArray(json.data)).toBe(true)
  })

  it("should create a track", async () => {
    const res = await app.request("/tracks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test Track",
        albumId: testAlbumId,
        mediaTypeId: testMediaTypeId,
        genreId: testGenreId,
        composer: "Test Composer",
        milliseconds: 300000,
        bytes: 1234567,
        unitPrice: 0.99
      })
    })
    expect(res.status).toBe(201)
    const json = await res.json()
    expect(json).toHaveProperty("id")
    createdId = json.id
  })

  it("should get the created track", async () => {
    const res = await app.request(`/tracks/${createdId}`)
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toHaveProperty("TrackId", createdId)
    expect(json).toHaveProperty("Name", "Test Track")
  })

  it("should update the track", async () => {
    const res = await app.request(`/tracks/${createdId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Updated Track",
        albumId: testAlbumId,
        mediaTypeId: testMediaTypeId,
        genreId: testGenreId,
        composer: "Updated Composer",
        milliseconds: 350000,
        bytes: 2345678,
        unitPrice: 1.99
      })
    })
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toHaveProperty("message", "Track updated successfully")
  })

  it("should list tracks by album", async () => {
    const res = await app.request(`/tracks/album/${testAlbumId}/tracks`)
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(Array.isArray(json)).toBe(true)
  })

  it("should list tracks by genre", async () => {
    const res = await app.request(`/tracks/genre/${testGenreId}/tracks`)
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(Array.isArray(json)).toBe(true)
  })

  it("should delete the track", async () => {
    const res = await app.request(`/tracks/${createdId}`, {
      method: "DELETE"
    })
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toHaveProperty("message", "Track deleted successfully")
  })

  it("should return 404 for deleted track", async () => {
    const res = await app.request(`/tracks/${createdId}`)
    expect(res.status).toBe(404)
  })
})
