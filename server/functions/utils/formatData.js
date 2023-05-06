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
function formatCompaniesAsRefV2(companies) {
    return companies.map((element) => ({
        ref: db.collection("companies").doc(element.name),
        name: element.name,
        time: element.time,
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

function getCompanyName(CName) {
    const names = CName.split("-");
    if (names.length > 1) {
        return names.slice(1, names.length).join(" ");
    } else {
        return names[0];
    }
}

function formatPreference(preferences) {
    return preferences.map((item) => getCompanyName(item.name));
}

export {
    formatError,
    validateIndex,
    formatCompaniesAsRef,
    formatCompaniesQueueAsRef,
    formatPreference,
    formatCompaniesAsRefV2,
};
