import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"
import * as controller from "../controllers/employees.controller"
import { employeeSchema } from "../schema/employees"

const employees = new Hono()

employees.get("/", controller.listEmployees)
employees.get("/:id", controller.getEmployee)
employees.get("/:id/reports", controller.getReports)
employees.post("/", zValidator("json", employeeSchema), controller.createEmployee)
employees.put("/:id", zValidator("json", employeeSchema), controller.updateEmployee)
employees.delete("/:id", controller.deleteEmployee)

export default employees
