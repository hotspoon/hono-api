import type { Context } from "hono";
import { sign } from "hono/jwt";
import { employeeSchema } from "@/features/employees/employees.schema";
import { validateEmail, validatePassword } from "@/utils/common";
import * as authService from "@/features/auth/auth.service";

const JWT_SECRET = process.env.JWT_SECRET || "";

export const signUp = async (c: Context) => {
  const employee = c.req.valid("json" as never);
  const { email, password } = await c.req.json();

  // Validate email and password
  const emailError = validateEmail(email);
  if (emailError) return c.json({ error: emailError }, 400);
  const passwordError = validatePassword(password);
  if (passwordError) return c.json({ error: passwordError }, 400);

  // Check if email already exists
  if (authService.isEmailRegistered(email)) {
    return c.json({ error: "Email already registered" }, 409);
  }

  // Hash password
  const hashedPassword = await authService.hashPassword(password);

  // Insert employee
  const result = authService.createEmployee(employee, email, hashedPassword);
  return c.json(
    { message: "Sign-up successful", id: result.lastInsertRowid },
    201,
  );
};

export const signIn = async (c: Context) => {
  const { email, password } = await c.req.json();

  // Validate email and password
  const emailError = validateEmail(email);
  if (emailError) return c.json({ error: emailError }, 400);
  const passwordError = validatePassword(password);
  if (passwordError) return c.json({ error: passwordError }, 400);

  const employee = authService.findEmployeeByEmail(email);
  if (!employee) {
    return c.json({ error: "Email not found, please sign up first" }, 401);
  }

  const valid = await authService.verifyPassword(password, employee.Password);
  if (!valid) {
    return c.json(
      { error: "Wrong password, please make sure you entered it correctly" },
      401,
    );
  }

  const token = await sign(
    {
      id: employee.EmployeeId,
      email: employee.Email,
      name: `${employee.FirstName} ${employee.LastName}`,
      title: employee.Title,
      role: employee.Role, // Include role
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour expiry
    },
    JWT_SECRET,
  );
  return c.json({ token });
};
