import { Router } from "express";
import { signUp } from "../controllers/student.controller.js";
const studentRouter = Router();

studentRouter.post("/sign-up", signUp);

export { studentRouter };
