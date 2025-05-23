import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { invoiceSchema } from "@/features/invoices/invoices.schema";
import * as controller from "@/features/invoices/invoices.controller";

const app = new Hono();

app.get("/", controller.listInvoices);
app.get("/:id", controller.getInvoice);
app.get("/:id/items", controller.getInvoiceLinesByInvoice);
app.post("/", zValidator("json", invoiceSchema), controller.createInvoice);
app.put("/:id", zValidator("json", invoiceSchema), controller.updateInvoice);
app.delete("/:id", controller.deleteInvoice);

export default app;
