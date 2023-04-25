import { useEffect, useState } from "react";
import StudentCard from "./StudentCard";
import { GridItem, useToast } from "@chakra-ui/react";
import { getAllStudents } from "../utils/api/student.api";

function StudentCardGrid() {
	//states
	const [data, setData] = useState([
		{
			indexNumber: "",
			firstName: "",
			lastName: "",
			cvURL: "",
			preferenceCarrierChoise: "",
			preferenceList: "",
			interviewsList: "",
			interviewsQueue: "",
			profilePhoto: "",
			createdAt: "",
		},
	]);
	const toast = useToast();
	//APIs
	useEffect(() => {
		//console.count("StudentCardGrid");
		async function getAll() {
			const _res = await getAllStudents();
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
				//console.log(_res.data);
			}
		}
		getAll();
	}, []);
	const studentCards = data.map((student) => (
		<GridItem key={student.indexNumber}>
			<StudentCard
				name={student.firstName}
				img_url={student.profilePhoto}
				index_number={student.indexNumber}
				name_initial={student.firstName + " " + student.lastName}
				interviewsList={student.interviewsList}
			></StudentCard>
		</GridItem>
	));
	return studentCards;
}

export default StudentCardGrid;
