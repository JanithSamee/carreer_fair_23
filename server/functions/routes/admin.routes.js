import { Router } from "express";
import {
    exportData,
    getAllAdmins,
    signUp,
} from "../controllers/admin.controller.js";
import autherenticateAdmin from "../middleware/admin.middleware.js";
const adminRouter = Router();

adminRouter.post("/add", signUp);
adminRouter.get("/export", autherenticateAdmin, exportData);
adminRouter.get("/get", autherenticateAdmin, getAllAdmins);

export default adminRouter;
