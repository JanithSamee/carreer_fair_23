import { auth } from "../db/exporter.js";
import { formatError } from "../utils/formatData.js";

export default function autherenticateAdmin(req, res, next) {
    try {
        const authToken = req.headers.authorization;

        if (!authToken) {
            return res.status(401).send({
                error: true,
                data: "Authentication token not found. Please log in to access this resource or check your credentials!",
            });
        }

        const idToken = authToken.split("Bearer ")[1];
        auth.verifyIdToken(idToken)
            .then((decodedToken) => {
                // The ID token is valid, and the decodedToken object contains the user's Firebase UID and other information
                if (decodedToken.role === "admin") {
                    const user = {
                        email: decodedToken.email,
                        uid: decodedToken.uid,
                        role: decodedToken.role,
                    };
                    req.user = user;
                    return next();
                } else {
                    return res.status(401).send({
                        error: true,
                        data: "Unauthorized to execute this API!",
                    });
                }
                // Do something with the UID or other information
            })
            .catch((error) => {
                // The ID token is invalid or has expired
                return res
                    .status(401)
                    .send({ error: true, data: formatError(error) });
            });
    } catch (error) {
        res.status(500).send({ error: true, data: formatError(error) });
    }
}
