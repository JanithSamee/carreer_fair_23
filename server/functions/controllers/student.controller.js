import { auth } from "../db/exporter.js";
import Student from "../models/studentModel.js";
import { generateToken } from "../utils/authHelper.js";
import { formatError, validateIndex } from "../utils/formatData.js";

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
        console.error(error);
        res.status(500).send({ error: true, data: formatError(error) });
    }
}

export { signUp };
