import base_api from "./_base.api";

export async function createCompany(formData) {
	try {
		const _res = await base_api.post("/company/add", formData);
		return _res;
	} catch (error) {
		(error.response && error.response.data) || {
			error: true,
			data: "Uknown Error!",
		};
	}
}
