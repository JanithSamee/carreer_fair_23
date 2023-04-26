import { Router } from "express";
import { getParams, setParams } from "../controllers/global.controller.js";
import autherenticateAdmin from "../middleware/admin.middleware.js";
import autherenticateStudent from "../middleware/student.middleware.js";
const globalRouter = Router();

globalRouter.get("/get", autherenticateAdmin, getParams);
globalRouter.get("/get-as-student", autherenticateStudent, getParams);
globalRouter.post("/set", autherenticateAdmin, setParams);

export default globalRouter;
