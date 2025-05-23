import { describe, it, expect } from "bun:test"
import app from "~/api/index"

describe("Artists API", () => {
  let createdId: number

  it("should list artists", async () => {
    const res = await app.request("/artists")
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toHaveProperty("data")
    expect(Array.isArray(json.data)).toBe(true)
  })

  it("should create an artist", async () => {
    const res = await app.request("/artists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Test Artist" })
    })
    expect(res.status).toBe(201)
    const json = await res.json()
    expect(json).toHaveProperty("id")
    createdId = json.id
  })

  it("should get the created artist", async () => {
    const res = await app.request(`/artists/${createdId}`)
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toHaveProperty("ArtistId", createdId)
    expect(json).toHaveProperty("Name", "Test Artist")
  })

  it("should update the artist", async () => {
    const res = await app.request(`/artists/${createdId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Updated Artist" })
    })
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toHaveProperty("message", "Artist updated successfully")
  })

  it("should delete the artist", async () => {
    const res = await app.request(`/artists/${createdId}`, {
      method: "DELETE"
    })
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toHaveProperty("message", "Artist deleted successfully")
  })

  it("should return 404 for deleted artist", async () => {
    const res = await app.request(`/artists/${createdId}`)
    expect(res.status).toBe(404)
  })
})
