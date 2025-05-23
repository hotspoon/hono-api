import { z } from "zod"

export const playlistSchema = z.object({
  name: z.string()
})

export const addTrackSchema = z.object({
  trackId: z.string()
})
