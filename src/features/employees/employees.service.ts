import { db } from "@/db/database"

export const getEmployees = () =>
  db
    .query(
      `SELECT EmployeeId, LastName, FirstName, Title, ReportsTo, BirthDate, HireDate, Address, City, State, Country, PostalCode, Phone, Fax, Email
     FROM employees`
    )
    .all()

export const getEmployeeById = (id: string) =>
  db.query("SELECT * FROM employees WHERE EmployeeId = ?").get(id)

export const getEmployeeReports = (id: string) =>
  db.query("SELECT * FROM employees WHERE ReportsTo = ?").all(id)

export const createEmployee = (employee: any) => {
  const stmt = db.prepare(
    `INSERT INTO employees 
      (LastName, FirstName, Title, ReportsTo, BirthDate, HireDate, Address, City, State, Country, PostalCode, Phone, Fax, Email)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
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
    employee.email ?? null
  )
}

export const updateEmployee = (id: string, employee: any) => {
  const stmt = db.prepare(
    `UPDATE employees SET 
      LastName = ?, FirstName = ?, Title = ?, ReportsTo = ?, BirthDate = ?, HireDate = ?, Address = ?, City = ?, State = ?, Country = ?, PostalCode = ?, Phone = ?, Fax = ?, Email = ?
     WHERE EmployeeId = ?`
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
    employee.email ?? null,
    id
  )
}

export const deleteEmployee = (id: string) => {
  const stmt = db.prepare("DELETE FROM employees WHERE EmployeeId = ?")
  return stmt.run(id)
}
