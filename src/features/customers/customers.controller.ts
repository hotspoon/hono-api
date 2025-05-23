import type { Context } from "hono";
import * as service from "@/features/customers/customers.service";

export const listCustomers = (c: Context) => {
  const customers = service.getCustomers();
  return c.json(customers);
};

export const getCustomer = (c: Context) => {
  const id = c.req.param("id");
  const customer = service.getCustomerById(id);
  if (!customer) {
    return c.json({ error: "Customer not found", status: 404 }, 404);
  }
  return c.json(customer);
};

export const getInvoicesByCustomer = (c: Context) => {
  const customerId = c.req.param("id");
  const invoices = service.getInvoicesByCustomer(customerId);
  return c.json(invoices);
};

export const createCustomer = (c: Context) => {
  const customer = c.req.valid("json" as never);
  const result = service.createCustomer(customer);
  return c.json(
    {
      message: "Customer created successfully",
      id: result.lastInsertRowid,
    },
    201,
  );
};

export const updateCustomer = (c: Context) => {
  const id = c.req.param("id");
  const customer = c.req.valid("json" as never);
  const result = service.updateCustomer(id, customer);
  if (result.changes === 0) {
    return c.json({ error: "Customer not found", status: 404 }, 404);
  }
  return c.json({
    message: "Customer updated successfully",
    id: id,
  });
};

export const deleteCustomer = (c: Context) => {
  const id = c.req.param("id");
  const result = service.deleteCustomer(id);
  if (result.changes === 0) {
    return c.json({ error: "Customer not found", status: 404 }, 404);
  }
  return c.json({
    message: "Customer deleted successfully",
    id: id,
  });
};

export const getCustomerByEmail = (c: Context) => {
  const email = c.req.param("email");
  const customer = service.getCustomerByEmail(email);
  if (!customer) {
    return c.json({ error: "Customer not found", status: 404 }, 404);
  }
  return c.json(customer);
};
