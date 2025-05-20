import { z } from "zod"

export const employeeSchema = z.object({
  lastName: z.string(),
  firstName: z.string(),
  title: z.string().nullable().optional(),
  reportsTo: z.number().nullable().optional(),
  birthDate: z.string().nullable().optional(),
  hireDate: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  state: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  postalCode: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  fax: z.string().nullable().optional(),
  email: z.string().nullable().optional()
})

// export type Employee = z.infer<typeof employeeSchema>
