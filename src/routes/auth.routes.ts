import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"
import { employeeSchema } from "../schema/employees"
import * as authController from "../controllers/auth.controller"

const auth = new Hono()

auth.post("/signup", zValidator("json", employeeSchema), authController.signUp)
auth.post("/signin", authController.signIn)

export default auth
