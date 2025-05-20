import { z } from "zod"

export const customerSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  company: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  postalCode: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{5}(-\d{4})?$/.test(val), { message: "Invalid postal code" }),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^\+?\d{7,15}$/.test(val), { message: "Invalid phone number" }),
  fax: z.string().optional(),
  email: z.string().email(),
  supportRepId: z.number().optional()
})
