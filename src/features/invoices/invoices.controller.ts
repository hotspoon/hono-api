import type { Context } from "hono";
import * as service from "@/features/invoices/invoices.service";

export const listInvoices = (c: Context) => {
  const page = Math.max(1, parseInt(c.req.query("page") || "1"));
  const limit = Math.min(
    100,
    Math.max(1, parseInt(c.req.query("limit") || "10")),
  );
  const offset = (page - 1) * limit;

  const invoices = service.getInvoices(limit, offset);
  const total = service.getInvoicesCount();

  return c.json({
    data: invoices,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
};

export const getInvoice = (c: Context) => {
  const id = c.req.param("id");
  const invoice = service.getInvoiceById(id);
  if (!invoice) {
    return c.json({ error: "Invoice not found", status: 404 }, 404);
  }
  return c.json(invoice);
};

export const getInvoiceLinesByInvoice = (c: Context) => {
  const invoiceId = c.req.param("id");
  const items = service.getInvoiceLinesByInvoice(invoiceId);
  return c.json(items);
};

export const createInvoice = (c: Context) => {
  const invoice = c.req.valid("json" as never);
  const result = service.createInvoice(invoice);
  return c.json(
    {
      message: "Invoice created successfully",
      id: result.lastInsertRowid,
    },
    201,
  );
};

export const updateInvoice = (c: Context) => {
  const id = c.req.param("id");
  const invoice = c.req.valid("json" as never);
  const result = service.updateInvoice(id, invoice);
  if (result.changes === 0) {
    return c.json({ error: "Invoice not found", status: 404 }, 404);
  }
  return c.json({
    message: "Invoice updated successfully",
    id: id,
  });
};

export const deleteInvoice = (c: Context) => {
  const id = c.req.param("id");
  const result = service.deleteInvoice(id);
  if (result.changes === 0) {
    return c.json({ error: "Invoice not found", status: 404 }, 404);
  }
  return c.json({
    message: "Invoice deleted successfully",
    id: id,
  });
};
