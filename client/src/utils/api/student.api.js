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
export async function getStudent() {
    try {
        const _res = await base_api.get("/student/single");
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
