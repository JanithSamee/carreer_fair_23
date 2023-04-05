import {
	Tab,
	Tabs,
	TabList,
	TabPanels,
	TabPanel,
	Grid,
	GridItem,
} from "@chakra-ui/react";
import StudentCard from "../components/StudentCard";
import { useState, useEffect } from "react";
import axios from "axios";

function Admin() {
	const [data, setData] = useState([]);
	useEffect(() => {
		axios
			.get("https://dog.ceo/api/breeds/image/random") //Mock API
			.then((response) =>
				setData([
					{
						student_name: "Geshan Sudasinghe",
						index_number: "180123A",
						img_url: "fmf",
						name_initial: "Sudasinghe K.S.G.S",
					},
					{
						student_name: "Geshan Sudasinghe",
						index_number: "180123B",
						img_url: "fmf",
						name_initial: "Perera A.B.C",
					},
				])
			)
			.catch((error) => console.error(error));
	}, []);

	const studentCards = data.map((student) => (
		<GridItem key={student.index_number}>
			<StudentCard
				name={student.student_name}
				img_url={student.img_url}
				index_number={student.index_number}
				name_initial={student.name_initial}
			></StudentCard>
		</GridItem>
	));

	return (
		<div>
			<Tabs
				variant="soft-rounded"
				colorScheme="teal"
				mt={5}
				ml={5}
				size="sm"
			>
				<TabList>
					<Tab>Students</Tab>
					<Tab>Company</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<Grid templateColumns="repeat(7, 1fr)" gap={3}>
							{studentCards}
							{/* <GridItem>
								<StudentCard
									name="Geshan Sudasinghe"
									img_url="sdbsnd"
									index_number="180135A"
								></StudentCard>
							</GridItem> */}
						</Grid>
					</TabPanel>
					<TabPanel>Company details</TabPanel>
				</TabPanels>
			</Tabs>
		</div>
	);
}

export default Admin;
