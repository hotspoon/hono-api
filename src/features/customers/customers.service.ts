import { db } from "@/db/database";

export const getCustomers = () => db.query("SELECT * FROM customers").all();

export const getCustomerById = (id: string) =>
  db.query("SELECT * FROM customers WHERE CustomerId = ?").get(id);

export const getInvoicesByCustomer = (customerId: string) =>
  db.query("SELECT * FROM invoices WHERE CustomerId = ?").all(customerId);

export const createCustomer = (customer: any) => {
  const stmt = db.prepare(
    `INSERT INTO customers (FirstName, LastName, Company, Address, City, State, Country, PostalCode, Phone, Fax, Email, SupportRepId)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  );
  return stmt.run(
    customer.firstName,
    customer.lastName,
    customer.company ?? null,
    customer.address ?? null,
    customer.city ?? null,
    customer.state ?? null,
    customer.country ?? null,
    customer.postalCode ?? null,
    customer.phone ?? null,
    customer.fax ?? null,
    customer.email,
    customer.supportRepId ?? null,
  );
};

export const updateCustomer = (id: string, customer: any) => {
  const stmt = db.prepare(
    `UPDATE customers SET FirstName = ?, LastName = ?, Company = ?, Address = ?, City = ?, State = ?, Country = ?, PostalCode = ?, Phone = ?, Fax = ?, Email = ?, SupportRepId = ?
     WHERE CustomerId = ?`,
  );
  return stmt.run(
    customer.firstName,
    customer.lastName,
    customer.company ?? null,
    customer.address ?? null,
    customer.city ?? null,
    customer.state ?? null,
    customer.country ?? null,
    customer.postalCode ?? null,
    customer.phone ?? null,
    customer.fax ?? null,
    customer.email,
    customer.supportRepId ?? null,
    id,
  );
};

export const deleteCustomer = (id: string) => {
  const stmt = db.prepare("DELETE FROM customers WHERE CustomerId = ?");
  return stmt.run(id);
};
export const getCustomerByEmail = (email: string) =>
  db.query("SELECT * FROM customers WHERE Email = ?").get(email);
