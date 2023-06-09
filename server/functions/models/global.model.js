import { db } from "../db/exporter.js";

// Reference to the 'users' collection in Firestore
const globalCollection = db.collection("global");

// Define the User model
class Global {
    constructor(data) {
        this.registrationDeadLine = new Date(
            data.registrationDeadLine || "2023.04.01"
        );
        this.eventDate = new Date(data.eventDate || "2023.04.01");
        this.preferenceUpdateStart = new Date(
            data.preferenceUpdateStart || "2023.04.01"
        );
        this.preferenceUpdateDeadLine = new Date(
            data.preferenceUpdateDeadLine || "2023.04.01"
        );
    }

    // Save the user data to Firestore
    async save() {
        try {
            const userRef = globalCollection.doc("v1");
            await userRef.update({
                registrationDeadLine: new Date(this.registrationDeadLine),
                eventDate: new Date(this.eventDate),
                preferenceUpdateDeadLine: new Date(
                    this.preferenceUpdateDeadLine
                ),
                preferenceUpdateStart: new Date(this.preferenceUpdateStart),
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
            preferenceUpdateDeadLine: this.preferenceUpdateDeadLine,
            preferenceUpdateStart: this.preferenceUpdateStart,
        };
    }

    // Find a user by ID in Firestore
    static async find() {
        try {
            const globalDoc = await globalCollection.doc("v1").get();

            if (globalDoc.exists) {
                const globalData = globalDoc.data();

                const registrationDeadLine = new Date(
                    globalData.registrationDeadLine._seconds * 1000
                );
                const eventDate = new Date(
                    globalData.eventDate._seconds * 1000
                );
                const preferenceUpdateDeadLine = new Date(
                    globalData.preferenceUpdateDeadLine._seconds * 1000
                );
                const preferenceUpdateStart = new Date(
                    globalData.preferenceUpdateStart._seconds * 1000
                );

                return new Global({
                    registrationDeadLine,
                    eventDate,
                    preferenceUpdateDeadLine,
                    preferenceUpdateStart,
                });
            }
            return null;
        } catch (error) {
            throw new Error({ message: "Error finding user." });
        }
    }
}

export default Global;
