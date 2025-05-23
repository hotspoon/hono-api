import { describe, it, expect } from "bun:test"
import app from "~/api/index"

describe("Invoices API", () => {
  let createdId: number
  const testCustomerId = 1 // Use a valid CustomerId from your DB

  it("should list invoices", async () => {
    const res = await app.request("/invoices")
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toHaveProperty("data")
    expect(Array.isArray(json.data)).toBe(true)
  })

  it("should create an invoice", async () => {
    const res = await app.request("/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerId: testCustomerId,
        invoiceDate: new Date().toISOString(),
        billingAddress: "123 Test St",
        billingCity: "Test City",
        billingState: "Test State",
        billingCountry: "Test Country",
        billingPostalCode: "12345",
        total: 99.99
      })
    })
    expect(res.status).toBe(201)
    const json = await res.json()
    expect(json).toHaveProperty("id")
    createdId = json.id
  })

  it("should get the created invoice", async () => {
    const res = await app.request(`/invoices/${createdId}`)
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toHaveProperty("InvoiceId", createdId)
    expect(json).toHaveProperty("CustomerId", testCustomerId)
    expect(json).toHaveProperty("Total", 99.99)
  })

  it("should update the invoice", async () => {
    const res = await app.request(`/invoices/${createdId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerId: testCustomerId,
        invoiceDate: new Date().toISOString(),
        billingAddress: "456 Updated St",
        billingCity: "Updated City",
        billingState: "Updated State",
        billingCountry: "Updated Country",
        billingPostalCode: "54321",
        total: 199.99
      })
    })
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toHaveProperty("message", "Invoice updated successfully")
  })

  it("should delete the invoice", async () => {
    const res = await app.request(`/invoices/${createdId}`, {
      method: "DELETE"
    })
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toHaveProperty("message", "Invoice deleted successfully")
  })

  it("should return 404 for deleted invoice", async () => {
    const res = await app.request(`/invoices/${createdId}`)
    expect(res.status).toBe(404)
  })
})
