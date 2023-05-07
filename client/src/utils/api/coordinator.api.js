import { formatError } from "../helpers/formatter";
import base_api from "./_base.api";

export async function addCoordinator({ email, password, phone, name }) {
    try {
        const _res = await base_api.post("/coordinator/add", {
            email,
            password,
            phone,
            name,
        });
        return _res.data;
    } catch (error) {
        return formatError(error);
    }
}
export async function assignCompaniesForCoordinators(formatData) {
    try {
        const _res = await base_api.post(
            "/coordinator/update-assign",
            formatData
        );
        return _res.data;
    } catch (error) {
        return formatError(error);
    }
}
export async function getCoordinators() {
    try {
        const _res = await base_api.get("/coordinator/get/all");
        return _res.data;
    } catch (error) {
        return formatError(error);
    }
}
export async function getCoordinator() {
    try {
        const _res = await base_api.get("/coordinator/get/single");
        return _res.data;
    } catch (error) {
        return formatError(error);
    }
}
