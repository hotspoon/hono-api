import type { Context } from "hono"

export const notFoundHandler = (c: Context) => {
  return c.json({ error: "Route Not Found", status: 404 }, 404)
}
