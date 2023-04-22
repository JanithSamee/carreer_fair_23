import {
	Card,
	CardBody,
	Avatar,
	Stack,
	Heading,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import EditCompanyModal from "./EditCompanyModal";
import { getCompany } from "../utils/api/company.api";

function CompanyCard({ name, img_url, companyID }) {
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

	useEffect(() => {
		async function getCompanyDetails(comID) {
			const _res = await getCompany(comID);
			if (_res.error) {
				toast({
					title: "An error occurred.",
					description: _res.message,
					status: "error",
					duration: 9000,
					isClosable: true,
				});
			} else {
				setFormInputs(_res.data);
			}
		}
		getCompanyDetails(companyID);
	}, []);

	async function handleSubmit() {
		//const ID = "522";
		console.log(formInputs);
		onClose();
	}

	return (
		<div>
			<Card minH={135} minW={135} justify="center">
				<CardBody>
					<Stack align={"center"}>
						<Avatar name={name} src={img_url} size="lg"></Avatar>
						<Heading
							size="xs"
							onClick={onOpen}
							textAlign={"center"}
							cursor="pointer"
						>
							{name}
						</Heading>
					</Stack>
				</CardBody>
			</Card>
			{/* <EditCompanyModal
				isOpen={isOpen}
				onClose={onClose}
				title={"Edit Company"}
				companyDes={"Add Description "}
				companyName=""
				email="example@eesoc.lk"
				setFormInputs={setFormInputs}
				formInputs={formInputs}
				handleSubmit={handleSubmit}
				formError={formError}
				loading={loading}
			/> */}
		</div>
	);
}

export default CompanyCard;
