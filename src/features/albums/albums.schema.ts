import { z } from "zod"

export const albumSchema = z.object({
  title: z.string().min(1, "Title is required"),
  artisid: z.number()
})
