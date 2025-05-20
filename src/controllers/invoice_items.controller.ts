import type { Context } from "hono"
import * as service from "../services/invoice_items.service"

export const listInvoiceItems = (c: Context) => {
  const page = Math.max(1, parseInt(c.req.query("page") || "1"))
  const limit = Math.min(100, Math.max(1, parseInt(c.req.query("limit") || "10")))
  const offset = (page - 1) * limit

  const items = service.getInvoiceItems(limit, offset)
  const total = service.getInvoiceItemsCount()

  return c.json({
    data: items,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  })
}

export const getInvoiceItems = (c: Context) => {
  const id = c.req.param("id")
  const item = service.getInvoiceItemsById(id)
  if (!item) {
    return c.json({ error: "Invoice item not found", status: 404 }, 404)
  }
  return c.json(item)
}
