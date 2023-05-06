import { formatError } from "../helpers/formatter";
import base_api from "./_base.api";

export async function assigneInterview(formData) {
    try {
        const _res = await base_api.post("/interview/add", formData);
        return _res.data;
    } catch (error) {
        return formatError(error);
    }
}
// export async function addAdmin(formData) {
//     try {
//         const _res = await base_api.post("/admin/add", formData);
//         return _res.data;
//     } catch (error) {
//         return formatError(error);
//     }
// }
