import { auth } from "../db/exporter.js";

async function generateToken(uid, role) {
    const token = await auth.createCustomToken(uid, {
        role: role,
    });
    return token;
}

export { generateToken };
