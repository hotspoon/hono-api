import { Hono } from "hono"
import * as controller from "../controllers/invoice_items.controller"

const app = new Hono()

app.get("/", controller.listInvoiceItems)
app.get("/:id", controller.getInvoiceItems)

export default app
