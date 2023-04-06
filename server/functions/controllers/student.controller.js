import { auth } from "../db/exporter.js";
import Student from "../models/student.model.js";
import { generateToken } from "../utils/authHelper.js";
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
                console.log(error);
                await auth.deleteUser(indexNumber);
                res.status(500).send({ error: true, data: formatError(error) });
            });
    } catch (error) {
        res.status(500).send({ error: true, data: formatError(error) });
    }
}

async function updateUser(req, res) {
    try {
        const indexNumber = "190542V"; // TODO: edit with middleware
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

        res.json({ error: false, data: user ? user.get() : [] });
    } catch (error) {
        res.status(500).send({ error: true, data: formatError(error) });
    }
}

async function updatePreference(req, res) {
    try {
        const { preferences } = req.body;
        const indexNumber = "190542V"; // TODO: edit with middleware
        const registrationDdl = new Date("2023-04-06T12:00:00Z"); //TODO: Get from global data
        const currentDate = new Date();
        if (!preferences || !Array.isArray(preferences)) {
            return res.status(400).send({
                error: true,
                data: "Preference List is empty or invalid.",
            });
        }
        if (registrationDdl.getTime() <= currentDate.getTime()) {
            return res.status(400).send({
                error: true,
                data: "Preference List can not be updated after the deadline",
            });
        }

        const preferenceRef = formatCompaniesAsRef(preferences);
        await Student.updateById(indexNumber, {
            preferenceList: preferenceRef,
        });

        res.json({ error: false, data: preferences });
    } catch (error) {
        res.status(500).send({ error: true, data: formatError(error) });
    }
}
async function updateInterviews(req, res) {
    const indexNumber = "190542V"; // TODO: edit with middleware
    try {
        const { interviews } = req.body;

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
        const { indexNumber } = req.query;
        const user = await Student.findById(indexNumber);
        res.json({ error: false, data: user });
    } catch (error) {
        res.status(500).send({ error: true, data: formatError(error) });
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
};
