import axios from "axios";
import { useEffect, useState } from "react";
import StudentCard from "./StudentCard";
import { GridItem } from "@chakra-ui/react";

function StudentCardGrid() {
	//states
	const [data, setData] = useState([]);
	//APIs
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
	return studentCards;
}

export default StudentCardGrid;
