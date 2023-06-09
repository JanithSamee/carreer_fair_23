import {
	Box,
	Center,
	Heading,
	SimpleGrid,
	Text,
	useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CompanyDisplay from "../components/CompanyDisplay";
import { getAllCompanies } from "../utils/api/company.api";

function Company() {
	//states
	const [data, setData] = useState([
		{
			companyId: "",
			name: "",
			maximumInterviews: "",
			startTime: "",
			endTime: "",
			requirements: "",
			interviewsList: "",
			profilePhoto: "",
			createdAt: "",
		},
	]);
	const toast = useToast();
	//APIs
	useEffect(() => {
		async function getData() {
			const _res = await getAllCompanies();
			if (_res.error) {
				toast({
					title: "An error occured !",
					description: _res.data,
					status: "error",
					duration: 9000,
					isClosable: true,
				});
			} else {
				setData(_res.data);
			}
		}
		getData();
	}, []);

	const companyCards = data.map((company, idx) => (
		<Box key={idx} mb={3}>
			<CompanyDisplay
				name={company.name}
				img_url={company.profilePhoto}
				companyId={company.companyId}
			></CompanyDisplay>
		</Box>
	));

	return (
		<>
			<Center>
				<Heading size="lg" m={5}>
					Company List
				</Heading>
			</Center>
			{data[0] === undefined ? (
				<div>
					<Center>
						<Text>
							We are currently in the process of finalizing the
							list of companies
						</Text>
					</Center>
				</div>
			) : (
				<SimpleGrid columns={[3, 4, 4, 4]} m={3} spacingX={5}>
					{companyCards}
				</SimpleGrid>
			)}
		</>
	);
}

export default Company;
