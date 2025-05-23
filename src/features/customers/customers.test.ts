import { describe, it, expect } from "bun:test"
import app from "~/api/index"

describe("Customers API", () => {
  let createdId: number

  it("should list customers", async () => {
    const res = await app.request("/customers")
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(Array.isArray(json)).toBe(true)
  })

  it("should create a customer", async () => {
    const res = await app.request("/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: "Test",
        lastName: "Customer",
        email: `test.customer.${Date.now()}@example.com`
      })
    })
    expect(res.status).toBe(201)
    const json = await res.json()
    expect(json).toHaveProperty("id")
    createdId = json.id
  })

  it("should get the created customer", async () => {
    const res = await app.request(`/customers/${createdId}`)
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toHaveProperty("CustomerId", createdId)
    expect(json).toHaveProperty("FirstName", "Test")
    expect(json).toHaveProperty("LastName", "Customer")
  })

  it("should update the customer", async () => {
    const res = await app.request(`/customers/${createdId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: "Updated",
        lastName: "Customer",
        email: `updated.customer.${Date.now()}@example.com`
      })
    })
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toHaveProperty("message", "Customer updated successfully")
  })

  it("should delete the customer", async () => {
    const res = await app.request(`/customers/${createdId}`, {
      method: "DELETE"
    })
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toHaveProperty("message", "Customer deleted successfully")
  })

  it("should return 404 for deleted customer", async () => {
    const res = await app.request(`/customers/${createdId}`)
    expect(res.status).toBe(404)
  })
})
