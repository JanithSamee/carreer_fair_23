const admin = require("firebase-admin");
const NODE_ENV = process.env.NODE_ENV;

const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
    credential:
        NODE_ENV === "dev"
            ? admin.credential.cert(serviceAccount)
            : admin.credential.applicationDefault(),
});

const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth };
