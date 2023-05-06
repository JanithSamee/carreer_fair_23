import { db } from "../db/exporter.js";

// Reference to the 'users' collection in Firestore
const coordinatorCollection = db.collection("coordinator");

// Define the User model
class Coordinator {
    constructor(data) {
        this.coordinatorId = data.coordinatorId;
        this.email = data.email;
        this.name = data.name;
        this.phone = data.phone;
        this.companies = data.companies || [];
        this.createdAt = data.createdAt || new Date();
    }

    // Save the user data to Firestore
    async save() {
        try {
            const userRef = coordinatorCollection.doc(this.coordinatorId);
            await userRef.set({
                coordinatorId: this.coordinatorId,
                email: this.email,
                name: this.name,
                phone: this.phone,
                companies: this.companies,
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
            phone: this.phone,
            name: this.name,
            accessLevel: this.accessLevel,
            createdAt: this.createdAt,
        };
    }

    // Find a user by ID in Firestore
    static async findById(id) {
        try {
            const adminDoc = await coordinatorCollection.doc(id).get();

            if (adminDoc.exists) {
                const userData = adminDoc.data();
                return new Coordinator(userData);
            }
            return null;
        } catch (error) {
            throw new Error({ message: "Error finding user." });
        }
    }

    static async updateById(userId, updatedData) {
        try {
            const userRef = coordinatorCollection.doc(userId);
            await userRef.update(updatedData);
            const userDoc = await userRef.get();
            // console.log(`User with ID ${userId} updated successfully.`);
            if (userDoc.exists) {
                const userData = userDoc.data();
                return new Coordinator(userData);
            }
            return null;
        } catch (error) {
            throw error;
        }
    }
    static async getUsers() {
        const users = await coordinatorCollection.get();

        let data = users.docs;

        data = data.map((user) => new Coordinator(user.data()));
        return data;
    }
}

export default Coordinator;
