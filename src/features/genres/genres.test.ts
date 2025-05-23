import { describe, it, expect } from "bun:test"
import app from "~/api/index"

describe("Genres API", () => {
  let createdId: number

  it("should list genres", async () => {
    const res = await app.request("/genres")
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(Array.isArray(json)).toBe(true)
  })

  it("should create a genre", async () => {
    const res = await app.request("/genres", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Test Genre" })
    })
    expect(res.status).toBe(201)
    const json = await res.json()
    expect(json).toHaveProperty("id")
    createdId = json.id
  })

  it("should get the created genre", async () => {
    const res = await app.request(`/genres/${createdId}`)
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toHaveProperty("GenreId", createdId)
    expect(json).toHaveProperty("Name", "Test Genre")
  })

  it("should update the genre", async () => {
    const res = await app.request(`/genres/${createdId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Updated Genre" })
    })
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toHaveProperty("message", "Genre updated successfully")
  })

  it("should delete the genre", async () => {
    const res = await app.request(`/genres/${createdId}`, {
      method: "DELETE"
    })
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toHaveProperty("message", "Genre deleted successfully")
  })

  it("should return 404 for deleted genre", async () => {
    const res = await app.request(`/genres/${createdId}`)
    expect(res.status).toBe(404)
  })
})
