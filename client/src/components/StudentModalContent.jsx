import { Avatar, Stack, Text } from "@chakra-ui/react";
import CompanyList from "./CompanyList";
import AddPrefComp from "./AddPrefComp";

function StudentModalContent({ name, img_url, name_initial, index_number }) {
	return (
		<div>
			<Stack align="center" spacing={0.5}>
				<Avatar name={name} size="lg" src={img_url}></Avatar>
				<Text>{index_number}</Text>
				<Text>{name_initial}</Text>
				<CompanyList></CompanyList>
				<AddPrefComp></AddPrefComp>
			</Stack>
		</div>
	);
}

export default StudentModalContent;
