import { Router } from "express";
import multer from "multer";
import {
    getUser,
    getUsers,
    signUp,
    updateInterviews,
    updateInterviewsQueue,
    updatePreference,
    updateProfilePicture,
    updateUser,
    uploadCV,
} from "../controllers/student.controller.js";
import autherenticateStudent from "../middleware/student.middleware.js";
const studentRouter = Router();

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // 5MB
    },
});

studentRouter.post("/sign-up", signUp);

studentRouter.get("/single", autherenticateStudent, getUser);

//TODO: add admin Middlewares
studentRouter.get("/all", getUsers);
studentRouter.post("/update-interviews", updateInterviews);
studentRouter.post("/update-interviews-queue", updateInterviewsQueue);

studentRouter.post("/update", autherenticateStudent, updateUser);
studentRouter.post(
    "/update-preferences",
    autherenticateStudent,
    updatePreference
);
studentRouter.post(
    "/update-profile-picture",
    upload.single("image"),
    autherenticateStudent,
    updateProfilePicture
);
studentRouter.post(
    "/update-cv",
    upload.single("cv"),
    autherenticateStudent,
    uploadCV
);

export { studentRouter };
