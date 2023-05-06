import { db } from "../db/exporter.js";

// Reference to the 'users' collection in Firestore
const interviewCollection = db.collection("interviews");

// Define the User model
class Interview {
    constructor(data) {
        this.interviewId = data.interviewId || "";
        this.studentId = data.studentId;
        this.companyId = data.companyId;
        this.interviewsStatus = data.interviewsStatus || "pending";
        this.time = data.time;
    }

    // Save the user data to Firestore
    async save() {
        try {
            const interviewRef = interviewCollection.doc();
            await interviewRef.create({
                interviewId: interviewRef.id,
                studentId: this.studentId,
                companyId: this.companyId,
                interviewsStatus: this.interviewsStatus,
                time: this.time,
            });

            return { interviewId: interviewRef.id, ...this };
        } catch (error) {
            throw error;
        }
    }

    get() {
        return {
            tinterviewId: this.interviewId,
            studentId: this.studentId,
            companyId: this.companyId,
            interviewsStatus: this.interviewsStatus,
            time: this.time,
        };
    }

    // Find a user by ID in Firestore
    static async findById(id) {
        try {
            const adminDoc = await interviewCollection.doc(id).get();

            if (adminDoc.exists) {
                const userData = adminDoc.data();
                return new Interview(userData);
            }
            return null;
        } catch (error) {
            throw new Error({ message: "Error Finding Interview." });
        }
    }

    static async updateById(interviewId, updatedData) {
        try {
            const interviewRef = interviewCollection.doc(interviewId);
            await interviewRef.update(updatedData);
            const interviewDoc = await interviewRef.get();
            // console.log(`User with ID ${interviewId} updated successfully.`);
            if (interviewDoc.exists) {
                const userData = interviewDoc.data();
                return new Interview(userData);
            }
            return null;
        } catch (error) {
            throw error;
        }
    }
    static async getInterviewsByCompany(companyId) {
        const interviews = await interviewCollection
            .where("companyId", "==", companyId)
            .orderBy("time")
            .get();

        let data = interviews.docs;

        data = data.map((interview) => new Interview(interview.data()));
        return data;
    }
    static async getInterviewsByStudent(studentId) {
        const interviews = await interviewCollection
            .where("studentId", "==", studentId)
            .orderBy("time")
            .get();

        let data = interviews.docs;

        data = data.map((interview) => new Interview(interview.data()));
        return data;
    }

    static async deleteInterviews(studentIdToDelete) {
        const query = interviewCollection.where(
            "studentId",
            "==",
            studentIdToDelete
        );

        // Execute the query and delete each document using the delete() method of the document reference
        query
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref
                        .delete()
                        .then(() => {
                            console.log(
                                `Document with ID ${doc.id} successfully deleted.`
                            );
                        })
                        .catch((error) => {
                            console.error(
                                `Error deleting document with ID ${doc.id}: ${error}`
                            );
                        });
                });
            })
            .catch((error) => {
                console.error(`Error getting documents to delete: ${error}`);
            });
    }
}

export default Interview;
