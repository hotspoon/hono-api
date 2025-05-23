import { describe, it, expect } from "bun:test"
import app from "../../../api/index"

describe("Albums API", () => {
  let createdId: number
  const testArtistId = 1 // Use a valid ArtistId from your DB

  it("should list albums", async () => {
    const res = await app.request("/albums")
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toHaveProperty("data")
    expect(Array.isArray(json.data)).toBe(true)
  })

  it("should create an album", async () => {
    const res = await app.request("/albums", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Test Album", artisid: testArtistId })
    })
    expect(res.status).toBe(201)
    const json = await res.json()
    expect(json).toHaveProperty("id")
    createdId = json.id
  })

  it("should get the created album", async () => {
    const res = await app.request(`/albums/${createdId}`)
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toHaveProperty("AlbumId", createdId)
    expect(json).toHaveProperty("Title", "Test Album")
    expect(json).toHaveProperty("ArtistId", testArtistId)
  })

  it("should update the album", async () => {
    const res = await app.request(`/albums/${createdId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Updated Album", artisid: testArtistId })
    })
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toHaveProperty("message", "Album updated successfully")
  })

  it("should delete the album", async () => {
    const res = await app.request(`/albums/${createdId}`, {
      method: "DELETE"
    })
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toHaveProperty("message", "Album deleted successfully")
  })

  it("should return 404 for deleted album", async () => {
    const res = await app.request(`/albums/${createdId}`)
    expect(res.status).toBe(404)
  })
})
