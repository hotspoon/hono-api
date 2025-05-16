import { Context } from "hono"
import { HTTPException } from "hono/http-exception"

export const errorHandler = (err: Error, c: Context) => {
  if (err instanceof HTTPException) {
    return err.getResponse()
  }

  console.error(err) // Log the error for debugging

  // Handle database errors
  if (err.message.includes("SQLITE_ERROR")) {
    return c.json({ error: "Database error", details: err.message }, 500)
  }

  // Handle validation errors
  if (err.message.includes("Validation failed")) {
    return c.json({ error: "Validation error", details: err.message }, 400)
  }

  // Generic error response
  return c.json({ error: "Internal server error" }, 500)
}
