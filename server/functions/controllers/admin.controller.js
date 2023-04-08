import { auth } from "../db/exporter.js";
import Admin from "../models/admin.model.js";
import { generateToken } from "../utils/authHelper.js";
import { formatError } from "../utils/formatData.js";

async function signUp(req, res) {
    const { email, password } = req.body;

    try {
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
                res.status(500).send({ error: true, data: formatError(error) });
            });
    } catch (error) {
        res.status(500).send({ error: true, data: formatError(error) });
    }
}

export { signUp };
