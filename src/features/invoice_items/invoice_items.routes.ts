import { Hono } from "hono";
import * as controller from "@/features/invoice_items/invoice_items.controller";

const app = new Hono();

app.get("/", controller.listInvoiceItems);
app.get("/:id", controller.getInvoiceItems);

export default app;
