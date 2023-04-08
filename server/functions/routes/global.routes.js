import { Router } from "express";
import { getParams, setParams } from "../controllers/global.controller.js";
import autherenticateAdmin from "../middleware/admin.middleware.js";
const globalRouter = Router();

globalRouter.get("/get", autherenticateAdmin, getParams);
globalRouter.post("/set", autherenticateAdmin, setParams);

export default globalRouter;
