import { auth } from "../db/exporter.js";
import Admin from "../models/admin.model.js";
import Student from "../models/student.model.js";
import { generateToken } from "../utils/authHelper.js";
import { formatError } from "../utils/formatData.js";
import { createObjectCsvStringifier } from "csv-writer";
// import path, { dirname } from "path";
// import { fileURLToPath } from "url";

async function signUp(req, res) {
    const { email, password, create_token } = req.body;

    try {
        if (process.env.ENV_ADMIN_TOKEN === create_token) {
            if (!email || !password) {
                return res.status(400).send({
                    error: true,
                    data: "Invalid Inputs or Insufficient Inputs",
                });
            }

            // Create a new user account using Firebase Admin SDK
            const userRecord = await auth.createUser({
                email,
                password,
                uid: email,
                displayName: email.split("@")[0],
                emailVerified: true,
            });

            await auth.setCustomUserClaims(userRecord.uid, { role: "admin" });

            const admin = new Admin({
                email,
                accessLevel: "full",
                adminId: email,
            });

            admin
                .save()
                .then(async () => {
                    // Generate a Firebase authentication token for the user using Firebase Functions SDK
                    const token = await generateToken(userRecord.uid, "admin");

                    // Return the authentication token to the client
                    res.send({ error: false, data: token });
                })
                .catch(async (error) => {
                    console.log(error);
                    await auth.deleteUser(email);
                    res.status(500).send({
                        error: true,
                        data: formatError(error),
                    });
                });
        } else {
            res.status(401).send({ error: true, data: "Unautherenticated!" });
        }
    } catch (error) {}
}

// async function exportData(req, res) {
//     try {
//         const users = await Student.getUsersComplete();

//         const __filename = fileURLToPath(import.meta.url);
//         const __dirname = dirname(__filename);
//         const filePath = path.join(__dirname, "output.csv");

//         const csvWriter = createObjectCsvWriter({
//             path: filePath,
//             header: [
//                 { id: "indexNumber", title: "indexNumber" },
//                 { id: "email", title: "email" },
//                 { id: "username", title: "username" },
//                 { id: "firstName", title: "firstName" },
//                 { id: "lastName", title: "lastName" },
//                 { id: "cvURL", title: "cvURL" },
//                 {
//                     id: "preferenceCarrierChoise",
//                     title: "preferenceCarrierChoise",
//                 },
//                 { id: "preferenceList", title: "preferenceList" },
//                 { id: "interviewsList", title: "interviewsList" },
//                 { id: "interviewsQueue", title: "interviewsQueue" },
//                 { id: "createdAt", title: "createdAt" },
//                 { id: "timeStamp", title: "timeStamp" },
//             ],
//         });

//         users.forEach((record) => {
//             record.preferenceList = JSON.stringify(record.preferenceList);
//             record.createdAt = new Date(record.createdAt.toDate());
//             record.timeStamp = record.createdAt.getTime();
//         });

//         csvWriter.writeRecords(users).then((csvFile) => {
//             res.setHeader(
//                 "Content-disposition",
//                 "attachment; filename=output.csv"
//             );
//             res.set("Content-Type", "text/csv");
//             res.status(200).sendFile(filePath);
//         });
//     } catch (error) {
//         res.status(500).send({ error: true, data: formatError(error) });
//     }
// }

async function exportData(req, res) {
    try {
        const users = await Student.getUsersComplete();

        const csvWriter = createObjectCsvStringifier({
            header: [
                { id: "indexNumber", title: "indexNumber" },
                { id: "email", title: "email" },
                { id: "username", title: "username" },
                { id: "firstName", title: "firstName" },
                { id: "lastName", title: "lastName" },
                { id: "cvURL", title: "cvURL" },
                {
                    id: "preferenceCarrierChoise",
                    title: "preferenceCarrierChoise",
                },
                { id: "preferenceList", title: "preferenceList" },
                { id: "interviewsList", title: "interviewsList" },
                { id: "interviewsQueue", title: "interviewsQueue" },
                { id: "createdAt", title: "createdAt" },
                { id: "timeStamp", title: "timeStamp" },
            ],
        });

        const records = users.map((record) => {
            return {
                indexNumber: record.indexNumber,
                email: record.email,
                username: record.username,
                firstName: record.firstName,
                lastName: record.lastName,
                cvURL: record.cvURL,
                preferenceCarrierChoise: record.preferenceCarrierChoise,
                preferenceList: JSON.stringify(record.preferenceList),
                interviewsList: record.interviewsList,
                interviewsQueue: record.interviewsQueue,
                createdAt: new Date(record.createdAt.toDate()),
                timeStamp: new Date(record.createdAt.toDate()).getTime(),
            };
        });

        const csvString = csvWriter.stringifyRecords(records);

        res.setHeader("Content-disposition", "attachment; filename=output.csv");
        res.set("Content-Type", "text/csv");
        res.status(200).send(csvString);
    } catch (error) {
        res.status(500).send({ error: true, data: formatError(error) });
    }
}

export { signUp, exportData };
