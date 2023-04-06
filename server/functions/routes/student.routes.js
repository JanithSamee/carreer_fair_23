import { Router } from "express";
import {
    getUser,
    getUsers,
    signUp,
    updateInterviews,
    updateInterviewsQueue,
    updatePreference,
    updateUser,
} from "../controllers/student.controller.js";
const studentRouter = Router();

studentRouter.post("/sign-up", signUp);

//TODO: add admin-student Middlewares
studentRouter.get("/single", getUser);

//TODO: add admin Middlewares
studentRouter.get("/all", getUsers);
studentRouter.post("/update-interviews", updateInterviews);
studentRouter.post("/update-interviews-queue", updateInterviewsQueue);

//TODO: add student Middlewares
studentRouter.post("/update", updateUser);
studentRouter.post("/update-preferences", updatePreference);

export { studentRouter };
