import {
	Grid,
	GridItem,
	Text,
	Box,
	FormControl,
	FormLabel,
	Select,
	Button,
	IconButton,
	Spacer,
	Flex,
	Avatar,
} from "@chakra-ui/react";
import { ArrowForwardIcon, CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";
import CloseButton from "./CloseButton";

function AddPrefComp() {
	const [company, setCompany] = useState("undefined");
	const [time, setTime] = useState();
	const [error, setError] = useState();
	const [interveiwList, setInterveiwList] = useState([{}]);

	const handleChangeCompany = (e) => setCompany(e.target.value);
	const handleChangeTime = (e) => setTime(e.target.value);
	function handleAssign() {
		if (
			company === undefined ||
			time === undefined ||
			company === "" ||
			time === ""
		) {
			setError("Required !");
		} else {
			const isAdded = interveiwList.find((u) => u.company === company);
			if (!isAdded) {
				const newList = interveiwList.concat({ company, time });
				setInterveiwList(newList);
			}
		}
	}
	console.log(interveiwList);

	const assignedInterveiws = interveiwList.map((interveiw, idx) => (
		<Flex
			boxShadow="sm"
			px={1}
			hidden={interveiw.company === undefined}
			justify="center"
			align="center"
			key={idx}
		>
			<Box>
				<Text fontSize="xs">{interveiw.company}</Text>
			</Box>
			<Spacer></Spacer>
			<CloseButton
				interveiw={interveiw}
				interveiwList={interveiwList}
				setInterveiwList={setInterveiwList}
			></CloseButton>
		</Flex>
	));

	return (
		<div>
			<Grid templateColumns="repeat(2, 2fr)" gap={8}>
				<GridItem justify="center">
					<Box boxShadow="md" p={5} mt={2}>
						<FormControl>
							<FormLabel fontSize="xs">Company</FormLabel>
							<Select
								size="xs"
								placeholder="Select Company"
								mb={3}
								required
								onChange={handleChangeCompany}
							>
								<option>WSO2</option>
								<option>LSEG</option>
								<option>CEB</option>
							</Select>
							<FormLabel fontSize="xs">Time Slot</FormLabel>
							<Select
								size="xs"
								placeholder=" Time Slot"
								required
								onChange={handleChangeTime}
							>
								<option>08.15</option>
								<option>08.30</option>
								<option>08.45</option>
							</Select>
						</FormControl>
						<Button
							rightIcon={<ArrowForwardIcon />}
							mt={3}
							size="xs"
							bg="teal.300"
							onClick={handleAssign}
							isDisabled={
								time === undefined || company === undefined
							}
						>
							Assign Interveiw
						</Button>
					</Box>
				</GridItem>
				<GridItem justify="center">
					<Box boxShadow="md" p={5} mt={2} minH={190}>
						{assignedInterveiws}
					</Box>
				</GridItem>
			</Grid>
		</div>
	);
}

export default AddPrefComp;
