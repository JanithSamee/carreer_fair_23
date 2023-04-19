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
} from "@chakra-ui/react";
import { MdAccessTime, MdPerson } from "react-icons/md";
import useAuth from "../../utils/providers/AuthProvider";
import StudentProfileModal from "../../components/student/StudentProfileModal";
import { getStudent } from "../../utils/api/student.api";
import PreferenceSelectorModal from "../../components/student/PreferenceSelectorModal";

function StudentDashboard() {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const avatarSize = useBreakpointValue({ base: "md", sm: "xl" });
    const [userData, setuserData] = useState({});
    const { logout, user } = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure();
    useEffect(() => {
        async function getData() {
            const _res = await getStudent();
            if (_res.error) {
                //TODO:add Toast
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
                flexDirection={isMobile ? "row" : "column"}
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
                <Box
                    ml={2}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDir={"column"}
                >
                    <Button
                        colorScheme="blue"
                        mt={8}
                        onClick={onOpen}
                        w={"100%"}
                    >
                        Change Profile
                    </Button>
                    <PreferenceSelectorModal></PreferenceSelectorModal>
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
                </Box>
            </Box>

            {/* Right side */}
            <Box flex={1} p={4}>
                <Heading as="h2" size="lg" mb={4}>
                    Upcoming events
                </Heading>
                <List spacing={3}>
                    <ListItem>
                        <ListIcon as={MdAccessTime} />
                        <Box flex={1}>
                            <Text fontWeight="bold">
                                Web development workshop
                            </Text>
                            <Text fontSize="sm" color="gray.500">
                                24 April 2023, 10:00 AM
                            </Text>
                        </Box>
                        <Avatar name="Jane Doe" size="xs" />
                        <Text ml={2}>Jane Doe</Text>
                    </ListItem>
                    <ListItem>
                        <ListIcon as={MdAccessTime} />
                        <Box flex={1}>
                            <Text fontWeight="bold">Career fair</Text>
                            <Text fontSize="sm" color="gray.500">
                                30 April 2023, 2:00 PM
                            </Text>
                        </Box>
                        <Avatar name="John Smith" size="xs" />
                        <Text ml={2}>John Smith</Text>
                    </ListItem>
                </List>
            </Box>
        </Flex>
    );
}

export default StudentDashboard;
