import { Router } from "express";
import {
    signUp,
    assignCompanies,
    getUser,
    getUsers,
} from "../controllers/coordinator.controller.js";
import autherenticateAdmin from "../middleware/admin.middleware.js";
import autherenticateCoordinator from "../middleware/coordinator.middleware.js";
const coordinatorRouter = Router();

coordinatorRouter.post("/add", autherenticateAdmin, signUp);
coordinatorRouter.get("/get/all", autherenticateAdmin, getUsers);
coordinatorRouter.get("/get/single", autherenticateCoordinator, getUser);
coordinatorRouter.post("/update-assign", autherenticateAdmin, assignCompanies);

export default coordinatorRouter;
