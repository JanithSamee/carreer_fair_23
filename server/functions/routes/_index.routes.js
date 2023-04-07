import { Router } from "express";
import { companyRouter } from "./company.routes.js";
import { studentRouter } from "./student.routes.js";

const router = Router();

router.use("/student/", studentRouter);
router.use("/company/", companyRouter);

export default router;
