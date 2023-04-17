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
