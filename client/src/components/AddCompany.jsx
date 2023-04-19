import { IconButton, useDisclosure, useToast } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import CompanyModal from "./CompanyModal";
import { useState } from "react";
import { createCompany } from "../utils/api/company.api";

function AddCompany() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [formInputs, setFormInputs] = useState({
		email: "",
		name: "",
		maximumInterviews: "",
		startTime: "",
		endTime: "",
		requirements: "",
	});
	const [formError, setFormError] = useState({ error: false, message: "" });
	const [loading, setLoading] = useState(false);
	const toast = useToast();

	async function handleSubmit() {
		if (
			!formInputs.email ||
			!formInputs.name ||
			!formInputs.requirements ||
			!formInputs.maximumInterviews
		) {
			setFormError({ error: true, message: "All fields are required!" });
		} else {
			try {
				setLoading(true);
				const _res = await createCompany(formInputs);
				if (_res.error) {
					toast({
						title: "An error occurred.",
						description: _res.message,
						status: "error",
						duration: 9000,
						isClosable: true,
					});
				} else {
					toast({
						title: "Done",
						description: "Company Added Successfully !",
						status: "success",
						duration: 9000,
						isClosable: true,
					});
				}

				setFormInputs({
					email: "",
					name: "",
					maximumInterviews: "",
					startTime: "",
					endTime: "",
					requirements: "",
				});
				onClose();
				setFormError({ error: false, message: "" });
				setLoading(false);
			} catch (error) {
				toast({
					title: "An error occurred.",
					description: error.message,
					status: "error",
					duration: 9000,
					isClosable: true,
				});
			}
		}
		setLoading(false);
	}

	return (
		<div>
			<IconButton
				icon={<AddIcon />}
				variant="outline"
				size="sm"
				onClick={onOpen}
			></IconButton>
			<CompanyModal
				isOpen={isOpen}
				onClose={onClose}
				title={"Add Company"}
				companyDes={"Add Description "}
				companyName=""
				email="example@eesoc.lk"
				setFormInputs={setFormInputs}
				formInputs={formInputs}
				handleSubmit={handleSubmit}
				formError={formError}
				loading={loading}
			/>
		</div>
	);
}

export default AddCompany;
