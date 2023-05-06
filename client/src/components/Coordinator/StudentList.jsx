import { Box, Button, IconButton, Switch } from "@chakra-ui/react";
import { useState } from "react";
import { TiTick } from "react-icons/ti";
import { FaArrowRight } from "react-icons/fa";

function StudentList({ onClose, setOngoing, ongoing, completedList }) {
	const [assignedStudentList, setAssignedStudentList] = useState([
		"180123V",
		"180147N",
	]);

	const handleSubmit = () => {
		//console.log(completedList);
		onClose();
	};

	const handleAssign = (student) => {
		if (ongoing === null) {
			setOngoing(student);
			setAssignedStudentList((prev) =>
				prev.filter((item) => item !== student)
			);
		}

		//console.log(student);
	};

	return (
		<>
			{assignedStudentList.map((student, index) => (
				<Box key={index} mt={3} display="flex" alignItems="center">
					<label htmlFor={index} style={{ marginLeft: "10px" }}>
						{student}
					</label>
					<IconButton
						icon={<FaArrowRight />}
						aria-label="Tick"
						colorScheme="red"
						size="xs"
						ml={2}
						variant="outline"
						borderRadius={100}
						alignSelf="center"
						onClick={() => handleAssign(student)}
					/>
				</Box>
			))}
			{/* <Box display="flex" justifyContent="flex-end">
				<Button
					size="sm"
					bg="blue.300"
					ml={2}
					my={2}
					onClick={() => handleSubmit()}
				>
					Done
				</Button>
			</Box> */}
		</>
	);
}

export default StudentList;
