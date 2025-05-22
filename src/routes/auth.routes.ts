import { Hono } from "hono"
import { db } from "../db/database"
import { employeeSchema } from "../schema/employees"
import { zValidator } from "@hono/zod-validator"
import { z } from "zod"
import { validateEmail, validatePassword } from "../utils/common"
import { sign } from "hono/jwt"

// Use a strong secret in production, store in env variable
const JWT_SECRET = process.env.JWT_SECRET || ""
// In-memory token store (for demo; use JWT or persistent store in production)
const tokens = new Map<string, any>()

// // Add a dummy token for testing
// tokens.set("dummytoken123", {
//   EmployeeId: 1,
//   FirstName: "Jane",
//   LastName: "Doe",
//   Email: "jane.doe@example.com",
//   Title: "Developer"
// })

const auth = new Hono()

// Sign-up (register new employee)
auth.post("/signup", zValidator("json", employeeSchema), async (c) => {
  const employee = c.req.valid("json" as never) as z.infer<typeof employeeSchema>
  const { email, password } = await c.req.json()

  // Validate email and password
  const emailError = validateEmail(email)
  if (emailError) return c.json({ error: emailError }, 400)
  const passwordError = validatePassword(password)
  if (passwordError) return c.json({ error: passwordError }, 400)

  // Check if email already exists
  const exists = db.query("SELECT 1 FROM employees WHERE Email = ?").get(email)
  if (exists) {
    return c.json({ error: "Email already registered" }, 409)
  }
  // Hash the password using Bun's built-in API
  const hashedPassword = await Bun.password.hash(password, {
    algorithm: "bcrypt",
    cost: 10 // recommended cost for production
  })
  // Insert employee with hashed password
  const stmt = db.prepare(
    `INSERT INTO employees 
      (LastName, FirstName, Title, ReportsTo, BirthDate, HireDate, Address, City, State, Country, PostalCode, Phone, Fax, Email, Password)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
  const result = stmt.run(
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
  return c.json({ message: "Sign-up successful", id: result.lastInsertRowid }, 201)
})

// Sign-in (login)
auth.post("/signin", async (c) => {
  const { email, password } = await c.req.json()

  // Validate email and password (same as sign-up)
  const emailError = validateEmail(email)
  if (emailError) return c.json({ error: emailError }, 400)
  const passwordError = validatePassword(password)
  if (passwordError) return c.json({ error: passwordError }, 400)

  const employee = db.query("SELECT * FROM employees WHERE Email = ?").get(email) as
    | {
        EmployeeId: number
        FirstName: string
        LastName: string
        Email: string
        Title: string
        Password: string
        [key: string]: any
      }
    | undefined
  if (!employee) {
    return c.json({ error: "Invalid credentials" }, 401)
  }
  // Compare password using Bun's built-in API
  const valid = await Bun.password.verify(password, employee.Password)
  if (!valid) {
    return c.json({ error: "Invalid credentials" }, 401)
  }
  // Generate JWT token using Hono's sign
  const token = await sign(
    {
      id: employee.EmployeeId,
      email: employee.Email,
      name: `${employee.FirstName} ${employee.LastName}`,
      title: employee.Title,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 // 1 hour expiry
    },
    JWT_SECRET
  )
  return c.json({ token })
})

export default auth
