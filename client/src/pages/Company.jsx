import {
	Box,
	Center,
	Flex,
	Grid,
	GridItem,
	Heading,
	SimpleGrid,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import CompanyCard from "../components/CompanyCard";
import CompanyDisplay from "../components/CompanyDisplay";

function Company() {
	//states
	const [data, setData] = useState([]);
	//APIs
	useEffect(() => {
		axios
			.get("https://dog.ceo/api/breeds/image/random") //Mock API
			.then((response) =>
				setData([
					{
						student_name: "WSO2",
						img_url: "fmf",
					},
					{
						student_name: "CEB",
						img_url: "fmf",
					},
					{
						student_name: "WSO2",
						img_url: "fmf",
					},
					{
						student_name: "CEB",
						img_url: "fmf",
					},
					{
						student_name: "WSO2",
						img_url: "fmf",
					},
					{
						student_name: "CEB",
						img_url: "fmf",
					},
					{
						student_name: "WSO2",
						img_url: "fmf",
					},
					{
						student_name: "CEB",
						img_url: "fmf",
					},
					{
						student_name: "WSO2",
						img_url: "fmf",
					},
					{
						student_name: "CEB",
						img_url: "fmf",
					},
					{
						student_name: "WSO2",
						img_url: "fmf",
					},
					{
						student_name: "CEB",
						img_url: "fmf",
					},
				])
			)
			.catch((error) => console.error(error));
	}, []);
	const companyCards = data.map((company, idx) => (
		<Box key={idx} mb={3}>
			<CompanyDisplay
				name={company.student_name}
				img_url={company.img_url}
			></CompanyDisplay>
		</Box>
	));
	return (
		<>
			<Center>
				<Heading size="md" m={5}>
					Company List
				</Heading>
			</Center>
			<SimpleGrid columns={[3, 6, 6, 8]} m={3}>
				{companyCards}
			</SimpleGrid>
		</>
	);
}

export default Company;
