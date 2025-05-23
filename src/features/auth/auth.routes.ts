import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { employeeSchema } from "@/features/employees/employees.schema";
import * as authController from "@/features/auth/auth.controller";

const auth = new Hono();

auth.post("/signup", zValidator("json", employeeSchema), authController.signUp);
auth.post("/signin", authController.signIn);

export default auth;
