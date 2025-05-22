import { db } from "../db/database"
import { Employee } from "../schema/employees"

export function findEmployeeByEmail(email: string): Employee | undefined {
  return db.query("SELECT * FROM employees WHERE Email = ?").get(email) as Employee | undefined
}

export function isEmailRegistered(email: string) {
  return db.query("SELECT 1 FROM employees WHERE Email = ?").get(email)
}

export async function hashPassword(password: string) {
  return await Bun.password.hash(password, { algorithm: "bcrypt", cost: 10 })
}

export async function verifyPassword(password: string, hash: string) {
  return await Bun.password.verify(password, hash)
}

export function createEmployee(employee: any, email: string, hashedPassword: string) {
  const stmt = db.prepare(
    `INSERT INTO employees 
      (LastName, FirstName, Title, ReportsTo, BirthDate, HireDate, Address, City, State, Country, PostalCode, Phone, Fax, Email, Password)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
  return stmt.run(
    employee.lastName,
    employee.firstName,
    employee.title ?? null,
    employee.reportsTo ?? null,
    employee.birthDate ?? null,
    employee.hireDate ?? null,
    employee.address ?? null,
    employee.city ?? null,
    employee.state ?? null,
    employee.country ?? null,
    employee.postalCode ?? null,
    employee.phone ?? null,
    employee.fax ?? null,
    email,
    hashedPassword
  )
}
