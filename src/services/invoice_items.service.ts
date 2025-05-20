import { db } from "../db/database"

export const getInvoiceItems = (limit: number, offset: number) =>
  db.query("SELECT * FROM invoice_items LIMIT ? OFFSET ?").all(limit, offset)

export const getInvoiceItemsCount = () =>
  (db.query("SELECT COUNT(*) as count FROM invoice_items").get() as { count: number }).count

export const getInvoiceItemsById = (id: string) =>
  db.query("SELECT * FROM invoice_items WHERE InvoiceLineId = ?").get(id)
