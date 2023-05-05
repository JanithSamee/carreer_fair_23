import {
	Avatar,
	Box,
	Button,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Text,
	useBreakpointValue,
} from "@chakra-ui/react";
import { useState } from "react";
import StudentList from "../../components/Coordinator/StudentList";

function CoDashboard() {
	const logout = () => {
		// Add logout logic here
	};

	const [selectedCompany, setSelectedCompany] = useState(null);

	const fontSize = useBreakpointValue({ base: "lg", sm: "md", lg: "xl" });

	const handleCardClick = (company) => {
		setSelectedCompany(company);
	};

	const handleModalClose = () => {
		setSelectedCompany(null);
	};

	return (
		<Box p={6}>
			<Box
				w="100%"
				display="flex"
				alignItems="center"
				justifyContent="space-between"
			>
				<Text
					color="blackAlpha.500"
					fontStyle="oblique"
					fontSize={fontSize}
					fontWeight="bold"
					m={4}
				>
					Co-Ordinator Panel
				</Text>
				<Menu>
					<MenuButton>
						<Avatar
							size="md"
							name="Company Logo"
							src="https://via.placeholder.com/50"
							ml={2}
							mr={5}
							my={3}
							cursor="pointer"
						/>
					</MenuButton>
					<MenuList>
						<MenuItem size="sm" onClick={logout}>
							Logout
						</MenuItem>
					</MenuList>
				</Menu>
			</Box>
			<Box
				w="100%"
				display="flex"
				flexWrap="wrap"
				alignItems="center"
				justifyContent="center"
			>
				{[...Array(10)].map((_, index) => (
					<Box
						key={index}
						w="200px"
						borderWidth="1px"
						borderRadius="md"
						overflow="hidden"
						m={3}
						display="flex"
						flexDirection="column"
						cursor="pointer"
						onClick={() => handleCardClick(`Company ${index + 1}`)}
					>
						<Avatar
							src="https://via.placeholder.com/300x200"
							alt="Company Logo"
							mx="auto"
							mt={5}
							size="lg"
						/>
						<Box p={2}>
							<Text
								fontWeight="bold"
								fontSize="lg"
								mb={2}
								textAlign="center"
							>
								Company {index + 1}
							</Text>
						</Box>
					</Box>
				))}
			</Box>
			{selectedCompany && (
				<Modal
					isOpen={!!selectedCompany}
					onClose={handleModalClose}
					size={["xs", "md", "xl"]}
				>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>{selectedCompany}</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Text fontSize={["sm", "md", "md"]}>
								Student List of {selectedCompany}.
							</Text>
							<StudentList
								onClose={handleModalClose}
							></StudentList>
						</ModalBody>
					</ModalContent>
				</Modal>
			)}
		</Box>
	);
}

export default CoDashboard;
