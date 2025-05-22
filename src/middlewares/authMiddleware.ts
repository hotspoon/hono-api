import { bearerAuth } from "hono/bearer-auth"
import { verify } from "hono/jwt"

const JWT_SECRET = process.env.JWT_SECRET || ""

// Bearer authentication for all other routes
const authMiddleware = bearerAuth({
  verifyToken: async (token, c) => {
    try {
      const payload = await verify(token, JWT_SECRET)
      c.set("employee", payload)
      return true
    } catch {
      return false
    }
  },
  noAuthenticationHeaderMessage: { error: "No Authorization header provided" },
  invalidAuthenticationHeaderMessage: { error: "Malformed Authorization header" },
  invalidTokenMessage: { error: "Unauthorized, Invalid Token" }
})

export { authMiddleware }
