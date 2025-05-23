import { describe, it, expect } from "bun:test"
import app from "~/api/index"

describe("Media Types API", () => {
  let firstMediaTypeId: number

  it("should list media types", async () => {
    const res = await app.request("/media-types")
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(Array.isArray(json)).toBe(true)
    if (json.length > 0) {
      firstMediaTypeId = json[0].MediaTypeId
    }
  })

  it("should get a media type by id", async () => {
    if (!firstMediaTypeId) {
      // Skip test if no media types exist
      return
    }
    const res = await app.request(`/media-types/${firstMediaTypeId}`)
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toHaveProperty("MediaTypeId", firstMediaTypeId)
  })

  it("should return 404 for non-existent media type", async () => {
    const res = await app.request("/media-types/9999999")
    expect(res.status).toBe(404)
  })
})
