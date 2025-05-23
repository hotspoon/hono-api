import { z } from "zod"

export const invoiceSchema = z.object({
  customerId: z.number(),
  invoiceDate: z.string(), // ISO date string, e.g. "2024-05-19"
  billingAddress: z.string().optional(),
  billingCity: z.string().optional(),
  billingState: z.string().optional(),
  billingCountry: z.string().optional(),
  billingPostalCode: z.string().optional(),
  total: z.number()
})
