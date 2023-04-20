import { db } from "../db/exporter.js";
import Company from "../models/company.model.js";
import { formatError } from "../utils/formatData.js";

async function addCompany(req, res) {
    const { email, name, maximumInterviews, startTime, endTime, requirements } =
        req.body;

    try {
        if (!email || !name) {
            return res.status(400).send({
                error: true,
                data: "Invalid Inputs or Insufficient Inputs",
            });
        }

        // Create a new user account using Firebase Admin SDK

        const _company = await db
            .collection("companies")
            .where("email", "==", email)
            .get();

        if (_company.docs.length > 0) {
            return res
                .status(400)
                .send({ error: true, data: "Company Already exsists!" });
        }

        const companyId = email.split("@")[0] + "-" + name.split(" ").join("-");

        const company = new Company({
            companyId,
            email,
            name,
            maximumInterviews,
            startTime,
            endTime,
            requirements,
        });

        company
            .save()
            .then(async () => {
                res.send({ error: false, data: company.get() });
            })
            .catch(async (error) => {
                console.log(error);

                res.status(500).send({ error: true, data: formatError(error) });
            });
    } catch (error) {
        res.status(500).send({ error: true, message: formatError(error) });
    }
}

async function updateCompany(req, res) {
    try {
        let {
            companyId,
            maximumInterviews,
            startTime,
            endTime,
            requirements,
            interviewsList,
            profilePhoto,
        } = req.body;

        console.log(maximumInterviews);
        maximumInterviews = maximumInterviews || 0;
        startTime = startTime || "";
        endTime = endTime || "";
        profilePhoto = profilePhoto || "";
        requirements = requirements || "";
        interviewsList = interviewsList || [];

        const company = await Company.updateById(companyId, {
            maximumInterviews,
            startTime,
            endTime,
            requirements,
            interviewsList,
            profilePhoto,
        });
        if (!company) {
            return res
                .status(404)
                .send({ error: true, data: "Company does not found!" });
        }
        res.json({ error: false, data: company ? company.get() : [] });
    } catch (error) {
        res.status(500).send({ error: true, message: formatError(error) });
    }
}

async function updateProfilePicture(req, res) {
    const _file = req.file;
    try {
        const { companyId } = req.body;
        if (_file) {
            const compressed = await resizeFile(_file.buffer);

            const result = await uploadFileToStorage(
                compressed,
                "company/profile-pictures/" + companyId + ".jpeg"
            );

            await Company.updateById(companyId, {
                profilePhoto: result.publicUrl(),
            });

            return res.status(404).send({
                error: false,
                message: "File uploaded successfully",
            });
        }
        res.status(404).send({ error: true, message: "File Not Found" });
    } catch (error) {
        console.error(error);
        res.status(404).send({ error: true, message: "Something went wrong" });
    }
}

async function getComapnies(req, res) {
    try {
        const companies = await Company.getCompanies();
        res.json({ error: false, data: companies });
    } catch (error) {
        res.status(500).send({ error: true, data: formatError(error) });
    }
}
async function getCompany(req, res) {
    try {
        const { companyId } = req.query;
        const company = await Company.findById(companyId);
        if (!company) {
            return res
                .status(404)
                .send({ error: true, data: "Company does not found!" });
        }
        res.json({ error: false, data: company });
    } catch (error) {
        res.status(500).send({ error: true, data: formatError(error) });
    }
}

export {
    addCompany,
    updateCompany,
    updateProfilePicture,
    getComapnies,
    getCompany,
};
