import { auth } from "../db/exporter.js";
import Global from "../models/global.model.js";
import Student from "../models/student.model.js";
import { generateToken } from "../utils/authHelper.js";
import { resizeFile, uploadFileToStorage } from "../utils/fileHandling.js";
import {
    formatCompaniesAsRef,
    formatCompaniesQueueAsRef,
    formatError,
    validateIndex,
} from "../utils/formatData.js";

async function signUp(req, res) {
    const { email, password, indexNumber, username } = req.body;

    try {
        if (!email || !password || !indexNumber || !username) {
            return res.status(400).send({
                error: true,
                data: "Invalid Inputs or Insufficient Inputs",
            });
        }
        if (!validateIndex(indexNumber)) {
            return res.status(400).send({
                error: true,
                data: "Invalid Index Number. Ex: 18XXXXX ",
            });
        }
        // Create a new user account using Firebase Admin SDK
        const userRecord = await auth.createUser({
            email,
            password,
            uid: indexNumber,
            displayName: username,
        });

        await auth.setCustomUserClaims(userRecord.uid, { role: "student" });

        const student = new Student({ email, username, indexNumber });

        student
            .save()
            .then(async () => {
                // Generate a Firebase authentication token for the user using Firebase Functions SDK
                const token = await generateToken(userRecord.uid, "student");

                // Return the authentication token to the client
                res.send({ error: false, data: token });
            })
            .catch(async (error) => {
                await auth.deleteUser(indexNumber);
                res.status(400).send({ error: true, data: formatError(error) });
            });
    } catch (error) {
        res.status(500).send({ error: true, data: formatError(error) });
    }
}

async function updateUser(req, res) {
    try {
        let indexNumber = "";
        if (req.user.role === "student") {
            indexNumber = req.user.uid;
        } else {
            indexNumber = req.body.indexNumber;
        }
        let {
            username,
            firstName,
            lastName,
            cvURL,
            preferenceCarrierChoise,
            profilePhoto,
        } = req.body;

        username = username || "";
        firstName = firstName || "";
        lastName = lastName || "";
        cvURL = cvURL || "";
        profilePhoto = profilePhoto || "";
        preferenceCarrierChoise = preferenceCarrierChoise || [];

        const user = await Student.updateById(indexNumber, {
            username,
            firstName,
            lastName,
            cvURL,
            preferenceCarrierChoise,
            profilePhoto,
        });
        if (!user) {
            return res
                .status(400)
                .send({ error: true, data: "Student does not found!" });
        }
        res.json({ error: false, data: user ? user.get() : [] });
    } catch (error) {
        res.status(500).send({ error: true, data: formatError(error) });
    }
}

async function updatePreference(req, res) {
    try {
        const { preferences } = req.body;
        const indexNumber = req.user.uid;
        const globalObject = await Global.find();

        const currentDate = new Date();
        if (!preferences || !Array.isArray(preferences)) {
            return res.status(400).send({
                error: true,
                data: "Preference List is empty or invalid.",
            });
        }
        if (
            globalObject.registrationDeadLine.getTime() <= currentDate.getTime()
        ) {
            return res.status(400).send({
                error: true,
                data: "Preference List can not be updated after the deadline",
            });
        }

        const isCVSubmited = await Student.isCVSubmited(indexNumber);

        if (!isCVSubmited) {
            return res.status(400).send({
                error: true,
                data: "Please upload a CV/Resume to update your preferences.",
            });
        }

        const preferenceRef = formatCompaniesAsRef(preferences);

        await Student.updateById(indexNumber, {
            preferenceList: preferenceRef,
        });

        res.json({ error: false, data: preferenceRef });
    } catch (error) {
        res.status(500).send({ error: true, data: formatError(error) });
    }
}
async function updateInterviews(req, res) {
    try {
        const { interviews, indexNumber } = req.body;

        if (!interviews || !Array.isArray(interviews)) {
            return res.status(400).send({
                error: true,
                data: "Preference List is empty or invalid.",
            });
        }

        const interviewRef = formatCompaniesAsRef(interviews);
        const interviewQueueRef = formatCompaniesQueueAsRef(interviews);
        await Student.updateById(indexNumber, {
            interviewsList: interviewRef,
            interviewsQueue: interviewQueueRef,
        });

        res.json({ error: false, data: interviews });
    } catch (error) {
        res.status(500).send({ error: true, data: formatError(error) });
    }
}
async function updateInterviewsQueue(req, res) {
    try {
        const { indexNumber, companyId, status } = req.body;

        if (!companyId || !status) {
            return res.status(400).send({
                error: true,
                data: "Invalid Data!",
            });
        }
        const student = await Student.findById(indexNumber);

        if (!student) {
            res.status(400).send({ error: true, data: "Student Not found" });
        }

        const interviews = student.interviewsQueue;

        for (const [index, doc] of interviews.entries()) {
            const _companyId = doc.company._path.segments[1];
            if (_companyId === companyId) {
                interviews[index].status = status;
            }
        }

        res.json({ error: false, data: interviews });
    } catch (error) {
        res.status(500).send({ error: true, data: formatError(error) });
    }
}

async function getUsers(req, res) {
    try {
        const users = await Student.getUsers();
        res.json({ error: false, data: users });
    } catch (error) {
        res.status(500).send({ error: true, data: formatError(error) });
    }
}
async function getUser(req, res) {
    try {
        let indexNumber = "";
        if (req.user.role === "student") {
            indexNumber = req.user.uid;
        } else {
            indexNumber = req.query.indexNumber;
        }

        const user = await Student.findById(indexNumber);
        if (!user) {
            return res
                .status(404)
                .send({ error: true, data: "User does not found!" });
        }
        res.json({ error: false, data: user });
    } catch (error) {
        res.status(500).send({ error: true, data: formatError(error) });
    }
}

async function updateProfilePicture(req, res) {
    // const _file = req.file;
    const indexNumber = req.user.uid;
    // console.log(_file);
    const { profilePhoto } = req.body;
    console.log(profilePhoto);
    try {
        if (profilePhoto) {
            // const compressed = await resizeFile(_file.buffer);

            // const result = await uploadFileToStorage(
            //     compressed,
            //     "student/profile-pictures/" + indexNumber + ".jpeg"
            // );

            await auth.updateUser(indexNumber, { photoURL: profilePhoto });
            await Student.updateById(indexNumber, {
                profilePhoto: profilePhoto,
            });

            return res.status(200).send({
                error: false,
                message: "File uploaded successfully",
            });
        } else {
            return res
                .status(404)
                .send({ error: true, message: "File Not Found" });
        }
    } catch (error) {
        console.error(error);
        res.status(404).send({ error: true, message: "Something went wrong" });
    }
}
async function uploadCV(req, res) {
    const indexNumber = req.user.uid;
    const { cvURL } = req.body;

    try {
        if (cvURL) {
            await Student.updateById(indexNumber, {
                cvURL: cvURL,
            });

            return res.status(200).send({
                error: false,
                message: "File uploaded successfully",
            });
        }
        res.status(404).send({ error: true, message: "File Not Found" });
    } catch (error) {
        console.error(error);
        res.status(404).send({ error: true, message: formatError(error) });
    }
}

export {
    signUp,
    updateUser,
    updatePreference,
    getUsers,
    getUser,
    updateInterviews,
    updateInterviewsQueue,
    updateProfilePicture,
    uploadCV,
};
