import { Router } from "express";
import adminRouter from "./admin.routes.js";
import { companyRouter } from "./company.routes.js";
import globalRouter from "./global.routes.js";
import { studentRouter } from "./student.routes.js";

const router = Router();

router.use("/student/", studentRouter);
router.use("/company/", companyRouter);
router.use("/admin/", adminRouter);
router.use("/global/", globalRouter);

export default router;
