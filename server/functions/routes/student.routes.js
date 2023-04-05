import { Router } from "express";
import { signUp, updateUser } from "../controllers/student.controller.js";
const studentRouter = Router();

studentRouter.post("/sign-up", signUp);

//TODO: add student Middlewares
studentRouter.post("/update", updateUser);

export { studentRouter };
