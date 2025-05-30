import { z } from "zod"

// Zod schema for artist validation
export const ArtistSchema = z.object({
  name: z.string().min(1, "Name is required")
})
