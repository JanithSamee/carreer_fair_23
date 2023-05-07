import { formatError } from "../helpers/formatter";
import base_api from "./_base.api";

export async function signUpStudent(formData) {
    try {
        const _res = await base_api.post("/student/sign-up", formData);
        return _res.data;
    } catch (error) {
        return (
            (error.response && error.response.data) || {
                error: true,
                data: error.message || "Uknown Error!",
            }
        );
    }
}
export async function updateStudent(formData) {
    try {
        const _res = await base_api.post("/student/update", formData);
        return _res.data;
    } catch (error) {
        return (
            (error.response && error.response.data) || {
                error: true,
                data: error.message || "Uknown Error!",
            }
        );
    }
}
export async function getStudent(indexNumber) {
    try {
        const _url = indexNumber
            ? "/student/single?indexNumber=" + indexNumber
            : "/student/single";
        const _res = await base_api.get(_url);
        return _res.data;
    } catch (error) {
        return (
            (error.response && error.response.data) || {
                error: true,
                data: error.message || "Uknown Error!",
            }
        );
    }
}

export async function updateStudentProfilePicture(imageUrl) {
    try {
        const _res = await base_api.post("/student/update-profile-picture", {
            profilePhoto: imageUrl,
        });
        return _res.data;
    } catch (error) {
        return (
            (error.response && error.response.data) || {
                error: true,
                data: error.message || "Uknown Error!",
            }
        );
    }
}
export async function updateStudentCV(cvURL) {
    try {
        const _res = await base_api.post("/student/update-cv", {
            cvURL: cvURL,
        });
        return _res.data;
    } catch (error) {
        return (
            (error.response && error.response.data) || {
                error: true,
                data: error.message || "Uknown Error!",
            }
        );
    }
}
export async function updateStudentCVAsCategory(CVCategory) {
    try {
        const _res = await base_api.post("/student/update-cv", {
            CVCategory: CVCategory,
        });
        return _res.data;
    } catch (error) {
        return (
            (error.response && error.response.data) || {
                error: true,
                data: error.message || "Uknown Error!",
            }
        );
    }
}
export async function updateStudentpreferences(formData) {
    try {
        const _res = await base_api.post(
            "/student/update-preferences",
            formData
        );
        return _res.data;
    } catch (error) {
        return formatError(error);
    }
}
export async function getAllStudents() {
    try {
        const _res = await base_api.get("/student/all");
        return _res.data;
    } catch (error) {
        return formatError(error);
    }
}
export async function getCvByIndex(indexNumber) {
    try {
        const _res = await base_api.get(
            "/student/cv?indexNumber=" + indexNumber
        );
        return _res.data;
    } catch (error) {
        return formatError(error);
    }
}
