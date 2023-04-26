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
