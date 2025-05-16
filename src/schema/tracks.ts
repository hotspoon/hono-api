import { z } from "zod"

// Zod schema for track validation (all fields lowercase)
export const trackSchema = z.object({
  name: z.string().min(1, "Name is required"),
  albumId: z.number().optional(),
  mediaTypeId: z.number(),
  genreId: z.number().optional(),
  composer: z.string().optional(),
  milliseconds: z.number(),
  bytes: z.number().optional(),
  unitPrice: z.number()
})
