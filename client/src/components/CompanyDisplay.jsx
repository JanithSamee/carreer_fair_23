import {
	Card,
	CardBody,
	Avatar,
	Stack,
	Heading,
	useDisclosure,
} from "@chakra-ui/react";
import CompanyDisplayModal from "./CompanyDisplayModal";
import { getCompany } from "../utils/api/company.api";
import { useState, useEffect } from "react";

function CompanyDisplay({ companyId, name, img_url }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [comData, setComData] = useState({
		companyId: "",
		email: "",
		name: "",
		maximumInterviews: "",
		startTime: {
			_nanoseconds: 0,
			_seconds: 0,
		},
		endTime: {
			_nanoseconds: 0,
			_seconds: 0,
		},
		requirements: "",
		interviewsList: [],
		profilePhoto: "",
		createdAt: {
			_seconds: 0,
			_nanoseconds: 0,
		},
	});
	//console.log(isOpen);
	useEffect(() => {
		async function getComData() {
			if (isOpen) {
				const _res = await getCompany(companyId);
				if (_res != undefined) {
					if (_res.error == true) {
						console.log(_res.error);
						//TODO:add toast
					} else {
						setComData(_res.data);
					}
				}
			}
		}
		getComData();
	}, [isOpen]);

	return (
		<div>
			<Card minW={115} minH={[170, 150, 180]}>
				<CardBody onClick={onOpen} cursor="pointer">
					<Stack align={"center"}>
						<Avatar
							name={name}
							src={comData.profilePhoto}
							size={["lg", "md", "xl"]}
						></Avatar>
						<Heading
							size={["xs", "xs", "sm"]}
							textAlign="center"
							cursor="pointer"
						>
							{name}
						</Heading>
					</Stack>
				</CardBody>
			</Card>

			<CompanyDisplayModal
				isOpen={isOpen}
				onClose={onClose}
				title={name}
				companyName={name}
				companyDes={comData.requirements}
				email={comData.email}
				vacancies={comData.maximumInterviews}
				img_url={comData.profilePhoto}
			></CompanyDisplayModal>
		</div>
	);
}

export default CompanyDisplay;
