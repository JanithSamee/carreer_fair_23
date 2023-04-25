import { Router } from "express";
import multer from "multer";
import {
    addCompany,
    getComapnies,
    getCompany,
    updateCompany,
    updateProfilePicture,
} from "../controllers/company.controller.js";
import autherenticateAdmin from "../middleware/admin.middleware.js";
import autherenticateStudent from "../middleware/student.middleware.js";
const companyRouter = Router();

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // 5MB
    },
});

// student-admin Autherentications
companyRouter.get("/all", autherenticateStudent, getComapnies);
companyRouter.get("/single", autherenticateStudent, getCompany);

// admin Autherentications
companyRouter.post("/add", autherenticateAdmin, addCompany);
companyRouter.post("/update", autherenticateAdmin, updateCompany);
companyRouter.post(
    "/update-profile-picture",
    autherenticateAdmin,
    updateProfilePicture
);

export { companyRouter };
