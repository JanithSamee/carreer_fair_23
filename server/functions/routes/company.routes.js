import { Router } from "express";
import multer from "multer";
import {
    addCompany,
    getComapnies,
    getCompany,
    updateCompany,
    updateProfilePicture,
} from "../controllers/company.controller.js";
const companyRouter = Router();

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // 5MB
    },
});

// TODO: student-admin Autherentications
companyRouter.get("/all", getComapnies);
companyRouter.get("/single", getCompany);

// TODO: admin Autherentications
companyRouter.post("/add", addCompany);
companyRouter.post("/update", updateCompany);
companyRouter.post(
    "/update-profile-picture",
    upload.single("image"),
    updateProfilePicture
);

export { companyRouter };
