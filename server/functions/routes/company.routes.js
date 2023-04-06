import { Router } from "express";
import multer from "multer";
import {
    addCompany,
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

companyRouter.post("/add", addCompany);
companyRouter.post("/update", updateCompany);
companyRouter.post(
    "/update-profile-picture",
    upload.single("image"),
    updateProfilePicture
);

export { companyRouter };
