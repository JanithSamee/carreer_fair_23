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
export async function getAllCompanies() {
	try {
		const _res = await base_api.get("company/all");
		return _res.data;
	} catch (error) {
		(error.response && error.response.data) || {
			error: true,
			data: "Uknown Error!",
		};
	}
}
export async function getCompany(companyID) {
	try {
		//console.log(companyID);
		if (companyID !== undefined) {
			const _res = await base_api.get(
				"company/single?companyId=".concat(companyID)
			);
			return _res.data;
		}
	} catch (error) {
		(error.response && error.response.data) || {
			error: true,
			data: "Uknown Error!",
		};
	}
}
