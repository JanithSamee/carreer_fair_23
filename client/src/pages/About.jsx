import { Box, Center, Heading, Text, VStack } from "@chakra-ui/react";
import { esocLogo, eventlogo } from "../assets/exportAssets";

function About() {
	return (
		<Box p={8}>
			<Center display={"flex"} flexDir={"column"} mb={4}>
				<Heading mb={4}>About</Heading>
				<Box display={"flex"} mt={8} mb={8}>
					<img src={eventlogo} alt="EESPIRE Logo" width="1000px" />
				</Box>

				<VStack spacing={6}>
					<Box w="100%" mx="auto">
						<Text textAlign="justify">
							<i>
								Made with ❤️ By Electrical Engineering Society
								University of Moratuwa
							</i>
						</Text>
					</Box>
				</VStack>
			</Center>
		</Box>
	);
}

export default About;
