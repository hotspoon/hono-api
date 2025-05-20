import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"
import { customerSchema } from "../schema/customers"
import * as controller from "../controllers/customers.controller"

const app = new Hono()

app.get("/", controller.listCustomers)
app.get("/:id", controller.getCustomer)
app.get("/:id/invoices", controller.getInvoicesByCustomer)
app.post("/", zValidator("json", customerSchema), controller.createCustomer)
app.put("/:id", zValidator("json", customerSchema), controller.updateCustomer)
app.delete("/:id", controller.deleteCustomer)
app.get("/email/:email", controller.getCustomerByEmail)

export default app
