import { db } from "../db/exporter.js";

// Reference to the 'users' collection in Firestore
const usersCollection = db.collection("students");

// Define the User model
class Student {
    constructor(data) {
        this.indexNumber = data.indexNumber;
        this.email = data.email;
        this.username = data.username;
        this.firstName = data.firstName || "";
        this.lastName = data.lastName || "";
        this.cvURL = data.cvURL || "";
        this.preferenceCarrierChoise = data.preferenceCarrierChoise || [];
        this.preferenceList = data.preferenceList || [];
        this.interviewsList = data.interviewsList || [];
        this.profilePhoto = data.profilePhoto || "";
        this.createdAt = data.createdAt || new Date();
    }

    // Save the user data to Firestore
    async save() {
        try {
            const userRef = usersCollection.doc(this.indexNumber);
            await userRef.set({
                indexNumber: this.indexNumber,
                email: this.email,
                username: this.username,
                firstName: this.firstName,
                lastName: this.lastName,
                cvURL: this.cvURL,
                preferenceCarrierChoise: this.preferenceCarrierChoise,
                preferenceList: this.preferenceList,
                interviewsList: this.interviewsList,
                profilePhoto: this.profilePhoto,
                createdAt: this.createdAt,
            });
            return this;
        } catch (error) {
            throw error;
        }
    }

    get() {
        return {
            indexNumber: this.indexNumber,
            email: this.email,
            username: this.username,
            firstName: this.firstName,
            lastName: this.lastName,
            cvURL: this.cvURL,
            preferenceCarrierChoise: this.preferenceCarrierChoise,
            preferenceList: this.preferenceList,
            interviewsList: this.interviewsList,
            profilePhoto: this.profilePhoto,
            createdAt: this.createdAt,
        };
    }

    // Find a user by ID in Firestore
    static async findById(id) {
        try {
            const userDoc = await usersCollection.doc(id).get();
            if (userDoc.exists) {
                const userData = userDoc.data();
                return new User(userData);
            }
            return null;
        } catch (error) {
            throw new Error({ message: "Error finding user." });
        }
    }
    static async updateById(userId, updatedData) {
        try {
            const userRef = usersCollection.doc(userId);
            await userRef.update(updatedData);
            const userDoc = await userRef.get();
            // console.log(`User with ID ${userId} updated successfully.`);
            if (userDoc.exists) {
                const userData = userDoc.data();
                return new Student(userData);
            }
            return null;
        } catch (error) {
            throw error;
        }
    }
}

export default Student;
