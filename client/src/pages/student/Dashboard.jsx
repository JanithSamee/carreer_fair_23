import React, { useEffect, useState } from "react";
import {
	Avatar,
	Box,
	Button,
	Flex,
	Heading,
	List,
	ListIcon,
	ListItem,
	Text,
	useBreakpointValue,
	FormControl,
	Input,
	FormLabel,
	useDisclosure,
	SimpleGrid,
	useToast,
	IconButton,
	Collapse,
} from "@chakra-ui/react";
import { MdAccessTime, MdPerson } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import useAuth from "../../utils/providers/AuthProvider";
import StudentProfileModal from "../../components/student/StudentProfileModal";
import { getStudent } from "../../utils/api/student.api";
import PreferenceSelectorModal from "../../components/student/PreferenceSelectorModal";
import UploadCVModal from "../../components/student/UploadCVModal";
import StudentEventsSection from "../../components/student/StudentEventsSection";
import AssignInterviewList from "../../components/student/AssignInterviewList";
import CurrentInterviewList from "../../components/student/CurrentInterviewList";

function StudentDashboard() {
	const toast = useToast();
	const isMobile = useBreakpointValue({ base: true, md: false });
	const avatarSize = useBreakpointValue({ base: "md", sm: "xl" });
	const [userData, setuserData] = useState({});
	const { logout, user } = useAuth();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isOpen1, setIsOpen1] = useState(false);
	const [isOpen2, setIsOpen2] = useState(false);
	const [isOpen3, setIsOpen3] = useState(true);

	const toggleCollapse1 = () => {
		setIsOpen1(!isOpen1);
	};

	const toggleCollapse2 = () => {
		setIsOpen2(!isOpen2);
	};

	const toggleCollapse3 = () => {
		setIsOpen3(!isOpen3);
	};

	useEffect(() => {
		//console.count("Dashboard");
		async function getData() {
			const _res = await getStudent();
			if (_res.error) {
				return toast({
					title: "An error occurred.",
					description: _res.data,
					status: "error",
					duration: 9000,
					isClosable: true,
				});
			} else {
				setuserData(_res.data);
			}
		}
		if (user && user.uid) {
			getData();
		}
	}, []);
	return (
		<Flex flexDir={isMobile ? "column" : "row"}>
			{/* Left side */}
			<Box
				w={isMobile ? "100%" : "25%"}
				bg="gray.200"
				p={4}
				height={isMobile ? "auto" : "100vh"}
				flexDirection={
					isMobile && avatarSize === "xl" ? "row" : "column"
				}
				backgroundColor="gray.100"
				display="flex"
				justifyContent="center"
				alignItems="center"
			>
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					flexDir={"column"}
				>
					<Avatar
						size={avatarSize}
						name={(user && user.displayName) || "-"}
						src={(user && user.photoURL) || ""}
						my={4}
					/>
					<Text fontSize="lg" fontWeight="bold" mb={2}>
						{(user && user.displayName) || "-"}
					</Text>
					<Text fontSize="sm" color="gray.600" mb={4}>
						{(user && user.email) || "-"}
					</Text>
					{/* <Button colorScheme="facebook" mb={1} onClick={onOpen}>
                    Edit
                </Button> */}
					<StudentProfileModal
						isOpen={isOpen}
						onClose={onClose}
						studentData={userData}
					></StudentProfileModal>
				</Box>
				<FormControl
					display={"flex"}
					alignItems={"center"}
					flexDirection={"column"}
				>
					<FormLabel>Index Number</FormLabel>
					<Input
						type="text"
						placeholder="18XXXXX"
						defaultValue={(user && user.uid) || "-"}
						readOnly
					/>
				</FormControl>
				<SimpleGrid
					columns={[2, 1, 1]}
					spacing="4"
					mt={2}
					p={5}
					w="100%"
					alignItems={"baseline"}
				>
					<Button
						colorScheme="blue"
						mt={8}
						mr={2}
						onClick={onOpen}
						w={"100%"}
					>
						Change Profile
					</Button>
					<UploadCVModal
						cvUrl={userData.cvURL}
						userData={userData}
						setUserData={setuserData}
					/>
					<PreferenceSelectorModal
						userData={userData}
						setUserData={setuserData}
					></PreferenceSelectorModal>
					<Button
						w={"100%"}
						colorScheme="orange"
						mt={4}
						onClick={async () => {
							await logout();
						}}
					>
						Logout
					</Button>
				</SimpleGrid>
			</Box>

			{/* Right side */}
			<Box flex={1} p={4}>
				<Heading as="h2" size="lg" my={4}>
					Current Interview Queue
					<IconButton
						icon={
							isOpen1 ? <IoIosArrowDown /> : <IoIosArrowForward />
						}
						onClick={toggleCollapse1}
						size={["md", "lg"]}
						variant="unstyled"
						mb={1}
					></IconButton>
				</Heading>
				<Collapse in={isOpen1}>
					<CurrentInterviewList></CurrentInterviewList>
				</Collapse>

				<Heading as="h2" size="lg" mb={4}>
					Upcoming events
					<IconButton
						icon={
							isOpen2 ? <IoIosArrowDown /> : <IoIosArrowForward />
						}
						onClick={toggleCollapse2}
						size={["md", "lg"]}
						variant="unstyled"
						mb={1}
					></IconButton>
				</Heading>
				<Collapse in={isOpen2}>
					<StudentEventsSection></StudentEventsSection>
				</Collapse>
				<Heading as="h2" size="lg" my={4}>
					Assign Interview list
					<IconButton
						icon={
							isOpen3 ? <IoIosArrowDown /> : <IoIosArrowForward />
						}
						onClick={toggleCollapse3}
						size={["md", "lg"]}
						variant="unstyled"
						mb={1}
					></IconButton>
				</Heading>
				<Collapse in={isOpen3}>
					<AssignInterviewList></AssignInterviewList>
				</Collapse>
			</Box>
		</Flex>
	);
}

export default StudentDashboard;
