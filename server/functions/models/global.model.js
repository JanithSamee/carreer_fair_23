import { db } from "../db/exporter.js";

// Reference to the 'users' collection in Firestore
const globalCollection = db.collection("global");

// Define the User model
class Global {
    constructor(data) {
        this.registrationDeadLine =
            data.registrationDeadLine || new Date("2023.04.01");
        this.eventDate = data.eventDate || new Date("2023.04.01");
    }

    // Save the user data to Firestore
    async save() {
        try {
            const userRef = globalCollection.doc("v1");
            await userRef.set({
                registrationDeadLine: this.registrationDeadLine,
                eventDate: this.eventDate,
            });
            return this;
        } catch (error) {
            throw error;
        }
    }

    get() {
        return {
            registrationDeadLine: this.registrationDeadLine,
            eventDate: this.eventDate,
        };
    }

    // Find a user by ID in Firestore
    static async find() {
        try {
            const globalDoc = await globalCollection.doc("v1").get();

            if (globalDoc.exists) {
                const globalData = globalDoc.data();

                return new Global(globalData);
            }
            return null;
        } catch (error) {
            throw new Error({ message: "Error finding user." });
        }
    }
}

export default Global;
