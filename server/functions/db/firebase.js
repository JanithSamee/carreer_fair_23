import admin from "firebase-admin";
const NODE_ENV = process.env.NODE_ENV;

import serviceAccount from "../serviceAccountKey.json";

admin.initializeApp({
    credential:
        NODE_ENV == "dev"
            ? admin.credential.cert(serviceAccount)
            : admin.credential.applicationDefault(),
});

const db = admin.firestore();

export { admin, db };
