import { Router } from "express";
import adminRouter from "./admin.routes.js";
import { companyRouter } from "./company.routes.js";
import globalRouter from "./global.routes.js";
import { studentRouter } from "./student.routes.js";
import interviewRouter from "./interview.routes.js";
import coordinatorRouter from "./coordinator.routes.js";

const router = Router();

router.use("/student/", studentRouter);
router.use("/company/", companyRouter);
router.use("/admin/", adminRouter);
router.use("/global/", globalRouter);
router.use("/coordinator/", coordinatorRouter);
router.use("/interview/", interviewRouter);

export default router;
