// index.test.ts
import { describe, it, expect } from "bun:test"
import app from "../../api/index"

describe("GET / → Welcome to the API", () => {
  it("should return welcome message", async () => {
    // Call the endpoint
    const res = await app.request("/")

    // Assertions
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({
      message: "Welcome to the API",
      version: "1.0.0"
    })
  })
})
