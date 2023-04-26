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
export async function getGlobalParamsAsStudent() {
    try {
        const _res = await base_api.get("/global/get-as-student");
        return _res.data;
    } catch (error) {
        return formatError(error);
    }
}
export async function updateGlobalParams(formData) {
    try {
        console.log(formData);
        const _res = await base_api.post("/global/set", formData);
        return _res.data;
    } catch (error) {
        return formatError(error);
    }
}
