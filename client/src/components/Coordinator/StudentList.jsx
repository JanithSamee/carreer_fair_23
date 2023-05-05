import { Box, Button, Switch } from "@chakra-ui/react";
import { useState } from "react";

function StudentList({ onClose }) {
	const [checkedStudents, setCheckedStudents] = useState([
		"Student 1",
		"Student 3",
	]);

	const handleStudentCheck = (studentName) => {
		if (checkedStudents.includes(studentName)) {
			setCheckedStudents((prevCheckedStudents) =>
				prevCheckedStudents.filter((name) => name !== studentName)
			);
		} else {
			setCheckedStudents((prevCheckedStudents) => [
				...prevCheckedStudents,
				studentName,
			]);
		}
	};

	const handleSubmit = () => {
		console.log(checkedStudents);
		onClose();
	};

	return (
		<>
			{[...Array(10)].map((_, index) => (
				<Box key={index} mt={3} display="flex" alignItems="center">
					<Switch
						id={`student-${index}`}
						name={`student-${index}`}
						size={["sm", "md", "md"]}
						onChange={(e) => handleStudentCheck(e.target.value)}
						isChecked={checkedStudents.includes(
							`Student ${index + 1}`
						)}
						value={`Student ${index + 1}`}
					/>
					<label
						htmlFor={`student-${index}`}
						style={{ marginLeft: "10px" }}
					>
						Student {index + 1}
					</label>
				</Box>
			))}
			<Box display="flex" justifyContent="flex-end">
				<Button
					size="sm"
					bg="blue.300"
					ml={2}
					my={2}
					onClick={() => handleSubmit()}
				>
					Done
				</Button>
			</Box>
		</>
	);
}

export default StudentList;
