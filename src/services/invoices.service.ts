import { db } from "../db/database"

export const getInvoices = (limit: number, offset: number) =>
  db.query("SELECT * FROM invoices LIMIT ? OFFSET ?").all(limit, offset)

export const getInvoicesCount = () =>
  (db.query("SELECT COUNT(*) as count FROM invoices").get() as { count: number }).count

export const getInvoiceById = (id: string) =>
  db.query("SELECT * FROM invoices WHERE InvoiceId = ?").get(id)

export const getInvoiceLinesByInvoice = (invoiceId: string) =>
  db.query("SELECT * FROM invoices WHERE InvoiceId = ?").all(invoiceId)

export const createInvoice = (invoice: any) => {
  const stmt = db.prepare(
    `INSERT INTO invoices (CustomerId, InvoiceDate, BillingAddress, BillingCity, BillingState, BillingCountry, BillingPostalCode, Total)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  )
  return stmt.run(
    invoice.customerId,
    invoice.invoiceDate,
    invoice.billingAddress ?? null,
    invoice.billingCity ?? null,
    invoice.billingState ?? null,
    invoice.billingCountry ?? null,
    invoice.billingPostalCode ?? null,
    invoice.total
  )
}

export const updateInvoice = (id: string, invoice: any) => {
  const stmt = db.prepare(
    `UPDATE invoices SET CustomerId = ?, InvoiceDate = ?, BillingAddress = ?, BillingCity = ?, BillingState = ?, BillingCountry = ?, BillingPostalCode = ?, Total = ?
     WHERE InvoiceId = ?`
  )
  return stmt.run(
    invoice.customerId,
    invoice.invoiceDate,
    invoice.billingAddress ?? null,
    invoice.billingCity ?? null,
    invoice.billingState ?? null,
    invoice.billingCountry ?? null,
    invoice.billingPostalCode ?? null,
    invoice.total,
    id
  )
}

export const deleteInvoice = (id: string) => {
  const stmt = db.prepare("DELETE FROM invoices WHERE InvoiceId = ?")
  return stmt.run(id)
}
