import { Router } from "express";
import { exportData, signUp } from "../controllers/admin.controller.js";
import autherenticateAdmin from "../middleware/admin.middleware.js";
const adminRouter = Router();

adminRouter.post("/add", autherenticateAdmin, signUp);
adminRouter.get("/export", autherenticateAdmin, exportData);

export default adminRouter;
