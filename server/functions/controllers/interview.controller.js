import {
    formatError,
    formatCompaniesAsRef,
    formatCompaniesAsRefV2,
} from "../utils/formatData.js";
import Interview from "../models/interview.model.js";
import Student from "../models/student.model.js";

async function getInterviewsByStudent(req, res) {
    try {
        let indexNumber = "";
        if (req.user.role === "student") {
            indexNumber = req.user.uid;
        } else {
            indexNumber = req.query.indexNumber;
        }
        const users = await Interview.getInterviewsByStudent(indexNumber);
        res.json({ error: false, data: users });
    } catch (error) {
        res.status(500).send({ error: true, data: formatError(error) });
    }
}
async function getInterviewsByCompany(req, res) {
    try {
        const companyId = req.query.companyId;
        const users = await Interview.getInterviewsByCompany(companyId);
        res.json({ error: false, data: users });
    } catch (error) {
        res.status(500).send({ error: true, data: formatError(error) });
    }
}

async function assignInterview(req, res) {
    try {
        const { interviews, indexNumber } = req.body;

        if (!interviews || !Array.isArray(interviews)) {
            return res.status(400).send({
                error: true,
                data: "Preference List is empty or invalid.",
            });
        }

        Interview.deleteInterviews(indexNumber);

        const interviewRef = formatCompaniesAsRefV2(interviews);
        await Student.updateById(indexNumber, {
            interviewsList: interviewRef,
        });

        for (let index = 0; index < interviews.length; index++) {
            const _interview = new Interview({
                studentId: indexNumber,
                companyId: interviews[index].company,
                time: interviews[index].time,
            });
            await _interview.save();
        }

        res.json({ error: false, data: interviews });
    } catch (error) {
        res.status(500).send({ error: true, data: formatError(error) });
    }
}

async function updateInterviewsQueue(req, res) {
    try {
        const { interviewId, status } = req.body;

        if (!interviewId || !status) {
            return res.status(400).send({
                error: true,
                data: "Invalid Data!",
            });
        }
        const interview = await Interview.updateById(interviewId, {
            interviewsStatus: status,
        });

        if (!interview) {
            res.status(400).send({ error: true, data: "Interview Not found" });
        }

        res.json({ error: false, data: interview });
    } catch (error) {
        res.status(500).send({ error: true, data: formatError(error) });
    }
}

export {
    updateInterviewsQueue,
    assignInterview,
    getInterviewsByCompany,
    getInterviewsByStudent,
};
