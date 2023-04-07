import { db } from "../db/exporter.js";

// Reference to the 'users' collection in Firestore
const companiesCollection = db.collection("companies");

// Define the User model
class Company {
    constructor(data) {
        this.companyId = data.companyId;
        this.email = data.email;
        this.name = data.name;
        this.maximumInterviews = data.maximumInterviews || 0;
        this.startTime = data.startTime || new Date();
        this.endTime = data.endTime || new Date();
        this.requirements = data.requirements || "";
        this.interviewsList = data.interviewsList || [];
        this.profilePhoto = data.profilePhoto || "";
        this.createdAt = data.createdAt || new Date();
    }

    // Save the user data to Firestore
    async save() {
        try {
            const userRef = companiesCollection.doc(this.companyId);
            await userRef.set({
                companyId: this.companyId,
                email: this.email,
                name: this.name,
                maximumInterviews: this.maximumInterviews || 0,
                startTime: this.startTime || new Date(),
                endTime: this.endTime || new Date(),
                requirements: this.requirements || [],
                interviewsList: this.interviewsList || [],
                profilePhoto: this.profilePhoto || [],
                createdAt: this.createdAt,
            });
            return this;
        } catch (error) {
            throw error;
        }
    }

    get() {
        return {
            companyId: this.companyId,
            email: this.email,
            name: this.name,
            maximumInterviews: this.maximumInterviews || 0,
            startTime: this.startTime || new Date(),
            endTime: this.endTime || new Date(),
            requirements: this.requirements || [],
            interviewsList: this.interviewsList || [],
            createdAt: this.createdAt,
        };
    }

    // Find a user by ID in Firestore
    static async findById(id) {
        try {
            const companyDoc = await companiesCollection.doc(id).get();

            if (companyDoc.exists) {
                const userData = companyDoc.data();
                return new Company(userData);
            }
            return null;
        } catch (error) {
            throw new Error({ message: "Error finding user." });
        }
    }
    static async updateById(companyId, updatedData) {
        try {
            const companyRef = companiesCollection.doc(companyId);
            await companyRef.update(updatedData);
            const companyDoc = await companyRef.get();
            // console.log(`User with ID ${companyId} updated successfully.`);
            if (companyDoc.exists) {
                const userData = companyDoc.data();
                return new Company(userData);
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async getCompanies() {
        const companies = await usersCollection
            .select("name", "companyId", "profilePhoto")
            .get();

        let data = companies.docs;

        data = data.map((user) => new Company(user.data()));
        return data;
    }
}

export default Company;
