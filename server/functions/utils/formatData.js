import { db } from "../db/exporter.js";

function formatError(error) {
    if (error.message && typeof error.message === "string") {
        return error.message;
    } else {
        return "Something went wrong.";
    }
}

function validateIndex(index = "sfds") {
    const regex = /^(18|19|20|21)\d{4}[A-Za-z]$/;
    if (regex.test(index)) {
        return true;
    } else {
        return false;
    }
}

function formatCompaniesAsRef(companies) {
    return companies.map((element) => ({
        ref: db.collection("companies").doc(element),
        name: element,
    }));
}
function formatCompaniesQueueAsRef(companies) {
    // statust = "assigned" | "ongoing" | "completed"
    return companies.map((element) => ({
        company: db.collection("companies").doc(element),
        status: "assigned",
        name: element,
    }));
}

export {
    formatError,
    validateIndex,
    formatCompaniesAsRef,
    formatCompaniesQueueAsRef,
};
