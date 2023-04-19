import { formatError } from "../helpers/formatter";
import base_api from "./_base.api";

export async function createCompany(formData) {
    try {
        const _res = await base_api.post("/company/add", formData);
        return _res;
    } catch (error) {
        return formatError(error);
    }
}
export async function getAllCompanies() {
    try {
        const _res = await base_api.get("/company/all");
        return _res.data;
    } catch (error) {
        return formatError(error);
    }
}
