import { formatError } from "../helpers/formatter";
import base_api from "./_base.api";

export async function exportStudentData() {
    try {
        const _res = await base_api.get("/admin/export");
        return _res.data;
    } catch (error) {
        return formatError(error);
    }
}
export async function getAllAdmins() {
    try {
        const _res = await base_api.get("/admin/get");
        return _res.data;
    } catch (error) {
        return formatError(error);
    }
}
export async function addAdmin(formData) {
    try {
        const _res = await base_api.post("/admin/add", formData);
        return _res.data;
    } catch (error) {
        return formatError(error);
    }
}
