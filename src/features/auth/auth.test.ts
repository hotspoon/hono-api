import { describe, it, expect } from "bun:test"
import app from "~/api/index"

describe("POST /auth/signin", () => {
  it("should sign in with valid credentials", async () => {
    const res = await app.request("/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: "jane.doe@example.com",
        password: "Akuganteng123!"
      })
    })

    expect(res.status).toBe(200) // Adjust if your API returns a different status
    const json = await res.json()
    // Adjust the following assertion based on your actual response structure
    expect(json).toHaveProperty("token")
  })
})
