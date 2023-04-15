import React from "react";
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
} from "@chakra-ui/react";
import { MdAccessTime, MdPerson } from "react-icons/md";
import useAuth from "../../utils/providers/AuthProvider";

function StudentDashboard() {
    const avatarSize = useBreakpointValue({ base: "sm", md: "md" });
    const { logout } = useAuth();

    return (
        <Flex>
            {/* Left side */}
            <Box
                w="25%"
                bg="gray.200"
                p={4}
                height="100vh"
                flexDirection={"column"}
                backgroundColor="gray.100"
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Avatar
                    size="xl"
                    name="John Doe"
                    src="https://bit.ly/broken-link"
                    my={4}
                />
                <Text fontSize="lg" fontWeight="bold" mb={2}>
                    John Doe
                </Text>
                <Text fontSize="sm" color="gray.600" mb={4}>
                    johndoe@example.com
                </Text>
                <FormControl
                    display={"flex"}
                    alignItems={"center"}
                    flexDirection={"column"}
                >
                    <FormLabel>Index Number</FormLabel>
                    <Input type="text" placeholder="ABC123" />
                </FormControl>

                <Button colorScheme="blue" mt={8}>
                    Change Password
                </Button>
                <Button colorScheme="green" mt={4}>
                    Add Preference
                </Button>
                <Button
                    colorScheme="orange"
                    mt={4}
                    onClick={async () => {
                        await logout();
                    }}
                >
                    Logout
                </Button>
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
