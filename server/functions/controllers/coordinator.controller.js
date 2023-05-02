import { auth } from "../db/exporter.js";
import Coordinator from "../models/coordinator.model.js";
import Student from "../models/student.model.js";
import { generateToken } from "../utils/authHelper.js";
import { formatError } from "../utils/formatData.js";
import { createObjectCsvStringifier } from "csv-writer";
// import path, { dirname } from "path";
// import { fileURLToPath } from "url";

async function signUp(req, res) {
    const { email, password } = req.body;

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

            await auth.setCustomUserClaims(userRecord.uid, {
                role: "coordinator",
            });

            const admin = new Coordinator({
                email,
                accessLevel: [],
                adminId: email,
            });

            admin
                .save()
                .then(async () => {
                    // Generate a Firebase authentication token for the user using Firebase Functions SDK
                    const token = await generateToken(
                        userRecord.uid,
                        "coordinator"
                    );

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
    } catch (error) {
        res.status(500).send({ error: true, data: formatError(error) });
    }
}

async function assignCompanies(req, res) {
    try {
        const { companies, coordinatorId } = req.body;

        const companiesRef = companies.map((element) =>
            db.collection("companies").doc(element)
        );
        await Coordinator.updateById(coordinatorId, { companiesRef });
        return res.status(200).send({ error: false, data: companiesRef });
    } catch (error) {
        res.status(500).send({ error: true, data: formatError(error) });
    }
}

async function getUsers(req, res) {
    try {
        const users = await Coordinator.getUsers();
        res.json({ error: false, data: users });
    } catch (error) {
        res.status(500).send({ error: true, data: formatError(error) });
    }
}
async function getUser(req, res) {
    try {
        let coordinatorId = "";
        if (req.user.role === "coordinator") {
            coordinatorId = req.user.uid;
        } else {
            coordinatorId = req.query.coordinatorId;
        }

        const user = await Coordinator.findById(coordinatorId);
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

export { signUp, assignCompanies, getUser, getUsers };
