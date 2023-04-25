import { formatError } from "../helpers/formatter";
import base_api from "./_base.api";

export async function getGlobalParams() {
    try {
        const _res = await base_api.get("/global/get");
        return _res.data;
    } catch (error) {
        return formatError(error);
    }
}
export async function setGlobalParams(formData) {
    try {
        const _res = await base_api.post("/global/set", formData);
        return _res.data;
    } catch (error) {
        return formatError(error);
    }
}
