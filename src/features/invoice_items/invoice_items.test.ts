import { describe, it, expect } from "bun:test"
import app from "~/api/index"

describe("Invoice Items API", () => {
  let firstItemId: number

  it("should list invoice items", async () => {
    const res = await app.request("/invoice-items")
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toHaveProperty("data")
    expect(Array.isArray(json.data)).toBe(true)
    if (json.data.length > 0) {
      firstItemId = json.data[0].InvoiceLineId
    }
  })

  it("should get an invoice item by id", async () => {
    if (!firstItemId) {
      // Skip test if no items exist
      return
    }
    const res = await app.request(`/invoice-items/${firstItemId}`)
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toHaveProperty("InvoiceLineId", firstItemId)
  })

  it("should return 404 for non-existent invoice item", async () => {
    const res = await app.request("/invoice-items/9999999")
    expect(res.status).toBe(404)
  })
})
