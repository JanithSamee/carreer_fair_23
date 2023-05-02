import { db } from "../db/exporter.js";

// Reference to the 'users' collection in Firestore
const adminsCollection = db.collection("admins");

// Define the User model
class Admin {
    constructor(data) {
        this.adminId = data.adminId;
        this.email = data.email;
        this.accessLevel = data.accessLevel || "low";
        this.createdAt = data.createdAt || new Date();
    }

    // Save the user data to Firestore
    async save() {
        try {
            const userRef = adminsCollection.doc(this.adminId);
            await userRef.set({
                adminId: this.adminId,
                email: this.email,
                accessLevel: this.accessLevel,
                createdAt: this.createdAt,
            });
            return this;
        } catch (error) {
            throw error;
        }
    }

    get() {
        return {
            adminId: this.adminId,
            email: this.email,
            accessLevel: this.accessLevel,
            createdAt: this.createdAt,
        };
    }

    // Find a user by ID in Firestore
    static async findById(id) {
        try {
            const adminDoc = await adminsCollection.doc(id).get();

            if (adminDoc.exists) {
                const userData = adminDoc.data();
                return new Admin(userData);
            }
            return null;
        } catch (error) {
            throw new Error({ message: "Error finding user." });
        }
    }
    static async getUsers() {
        const users = await adminsCollection.get();

        let data = users.docs;

        data = data.map((user) => new Admin(user.data()));
        return data;
    }
}

export default Admin;
