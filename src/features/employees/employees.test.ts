import { describe, it, expect } from "bun:test"
import app from "~/api/index"

describe("Employees API", () => {
  let createdId: number

  it("should list employees", async () => {
    const res = await app.request("/employees")
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(Array.isArray(json)).toBe(true)
  })

  it("should create an employee", async () => {
    const res = await app.request("/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lastName: "Test",
        firstName: "Employee",
        title: "Developer",
        email: `test.employee.${Date.now()}@example.com`
      })
    })
    expect(res.status).toBe(201)
    const json = await res.json()
    expect(json).toHaveProperty("id")
    createdId = json.id
  })

  it("should get the created employee", async () => {
    const res = await app.request(`/employees/${createdId}`)
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toHaveProperty("EmployeeId", createdId)
    expect(json).toHaveProperty("FirstName", "Employee")
    expect(json).toHaveProperty("LastName", "Test")
  })

  it("should get reports for the employee", async () => {
    const res = await app.request(`/employees/${createdId}/reports`)
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(Array.isArray(json)).toBe(true)
  })

  it("should update the employee", async () => {
    const res = await app.request(`/employees/${createdId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lastName: "Updated",
        firstName: "Employee",
        title: "Lead Developer",
        email: `updated.employee.${Date.now()}@example.com`
      })
    })
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toHaveProperty("message", "Employee updated successfully")
  })

  it("should delete the employee", async () => {
    const res = await app.request(`/employees/${createdId}`, {
      method: "DELETE"
    })
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toHaveProperty("message", "Employee deleted successfully")
  })

  it("should return 404 for deleted employee", async () => {
    const res = await app.request(`/employees/${createdId}`)
    expect(res.status).toBe(404)
  })
})
