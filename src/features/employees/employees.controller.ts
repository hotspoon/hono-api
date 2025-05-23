import type { Context } from "hono"
import * as employeeService from "@/features/employees/employees.service"

export const listEmployees = (c: Context) => {
  const employees = employeeService.getEmployees()
  return c.json(employees)
}

export const getEmployee = (c: Context) => {
  const id = c.req.param("id")
  const employee = employeeService.getEmployeeById(id)
  if (!employee) {
    return c.json({ error: "Employee not found", status: 404 }, 404)
  }
  return c.json(employee)
}

export const getReports = (c: Context) => {
  const id = c.req.param("id")
  const reports = employeeService.getEmployeeReports(id)
  return c.json(reports)
}

export const createEmployee = (c: Context) => {
  const employee = c.req.valid("json" as never)
  const result = employeeService.createEmployee(employee)
  return c.json(
    {
      message: "Employee created successfully",
      id: result.lastInsertRowid
    },
    201
  )
}

export const updateEmployee = (c: Context) => {
  const id = c.req.param("id")
  const employee = c.req.valid("json" as never)
  const result = employeeService.updateEmployee(id, employee)
  if (result.changes === 0) {
    return c.json({ error: "Employee not found", status: 404 }, 404)
  }
  return c.json({
    message: "Employee updated successfully",
    id: id
  })
}

export const deleteEmployee = (c: Context) => {
  const id = c.req.param("id")
  const result = employeeService.deleteEmployee(id)
  if (result.changes === 0) {
    return c.json({ error: "Employee not found", status: 404 }, 404)
  }
  return c.json({
    message: "Employee deleted successfully",
    id: id
  })
}
