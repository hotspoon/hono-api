import type { MiddlewareHandler } from "hono";

export function requireRole(roles: string[]): MiddlewareHandler {
  return async (c, next) => {
    const employee = c.get("employee");
    if (!employee || !roles.includes(employee.role)) {
      return c.json({ error: "Forbidden: insufficient role" }, 403);
    }
    await next();
  };
}
