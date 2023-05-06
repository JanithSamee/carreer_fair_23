import { Router } from "express";
import {
    updateInterviewsQueue,
    assignInterview,
    getInterviewsByCompany,
    getInterviewsByStudent,
} from "../controllers/interview.controller.js";
import autherenticateAdmin from "../middleware/admin.middleware.js";
import autherenticateStudent from "../middleware/student.middleware.js";
const interviewRouter = Router();

interviewRouter.post("/add", autherenticateAdmin, assignInterview);
interviewRouter.post("/update", autherenticateAdmin, updateInterviewsQueue);
interviewRouter.get(
    "/get-by-student",
    autherenticateStudent,
    getInterviewsByStudent
);
// TODO: add coordinator role
interviewRouter.get(
    "/get-by-company",
    autherenticateStudent,
    getInterviewsByCompany
);

export default interviewRouter;
