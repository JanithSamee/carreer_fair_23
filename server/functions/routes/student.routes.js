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
const studentRouter = Router();

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // 5MB
    },
});

studentRouter.post("/sign-up", signUp);

//TODO: add admin-student Middlewares
studentRouter.get("/single", getUser);

//TODO: add admin Middlewares
studentRouter.get("/all", getUsers);
studentRouter.post("/update-interviews", updateInterviews);
studentRouter.post("/update-interviews-queue", updateInterviewsQueue);

//TODO: add student Middlewares
studentRouter.post("/update", updateUser);
studentRouter.post("/update-preferences", updatePreference);
studentRouter.post(
    "/update-profile-picture",
    upload.single("image"),
    updateProfilePicture
);
studentRouter.post("/update-cv", upload.single("cv"), uploadCV);

export { studentRouter };
