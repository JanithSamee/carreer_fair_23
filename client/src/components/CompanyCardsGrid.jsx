import { GridItem } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import CompanyCard from "./CompanyCard";

function CompanyCardsGrid() {
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
				])
			)
			.catch((error) => console.error(error));
	}, []);
	const companyCards = data.map((company, idx) => (
		<GridItem key={idx}>
			<CompanyCard
				name={company.student_name}
				img_url={company.img_url}
			></CompanyCard>
		</GridItem>
	));
	return companyCards;
}

export default CompanyCardsGrid;
