import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";

function AssignInterviewList() {
	const [allinterviewList, setAllinterviewList] = useState([
		{ name: "LSEG", timeSlot: "May 08, 2023 at 8.00 AM" },
		{ name: "Dialog DNS", timeSlot: "May 08, 2023 at 8.00 AM" },
	]);
	return (
		<div>
			<Box>
				{allinterviewList.map((inter, idx) => (
					<Box flexWrap="wrap" alignItems="center" key={idx}>
						<Flex>
							<Text color="gray" fontSize={["sm", "sm", "md"]}>
								{inter.timeSlot}
							</Text>
							<Text
								ml={2}
								fontWeight={700}
								fontSize={["md", "sm", "lg"]}
							>
								- {inter.name}
							</Text>
						</Flex>
						<Divider my={2}></Divider>
					</Box>
				))}
			</Box>
		</div>
	);
}

export default AssignInterviewList;
