import { Router } from "express";
import { signUp } from "../controllers/admin.controller.js";
import autherenticateAdmin from "../middleware/admin.middleware.js";
const adminRouter = Router();

adminRouter.post("/add", autherenticateAdmin, signUp);

export default adminRouter;
