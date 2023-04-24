//AdminAccountsTab.jsx
import React, { useState } from "react";
import {
    Box,
    Flex,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Text,
    useDisclosure,
    Avatar,
    Center,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
} from "@chakra-ui/react";
import { AddCompanyModalForCoodinator } from "./AddCompanyModalForCoodinator";

const AdminAccountsTab = () => {
    const [username, setUsername] = useState("John Doe");
    const [email, setEmail] = useState("johndoe@example.com");

    const { isOpen, onOpen, onClose } = useDisclosure();

    const handlePasswordChange = (e) => {
        // TODO: Implement password change logic
        onClose();
    };

    const [users, setUsers] = useState([
        { id: 1, name: "User 1", companies: [] },
        { id: 2, name: "User 2", companies: [] },
        { id: 3, name: "User 3", companies: [] },
        { id: 4, name: "User 3", companies: [] },
        { id: 5, name: "User 3", companies: [] },
    ]);
    const [isAddingCompany, setIsAddingCompany] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleAddCompany = (user, company) => {
        const updatedUsers = users.map((u) =>
            u.id === user.id
                ? { ...u, companies: [...u.companies, company] }
                : u
        );
        setUsers(updatedUsers);
    };
    return (
        <Flex direction="column" align="center" justify="center">
            <Box w="md" bg="white" p={6} borderRadius="md" boxShadow="md">
                <Center>
                    <Avatar></Avatar>
                </Center>
                <FormControl mb={4}>
                    <FormLabel>Username</FormLabel>
                    <Input
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </FormControl>
                <FormControl mb={4}>
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
                <Button onClick={onOpen} mb={4} colorScheme="orange">
                    Change Password
                </Button>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Change Password</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl mb={4}>
                            <FormLabel>Current Password</FormLabel>
                            <Input
                                type="password"
                                placeholder="Enter your current password"
                            />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel>New Password</FormLabel>
                            <Input
                                type="password"
                                placeholder="Enter your new password"
                            />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel>Confirm New Password</FormLabel>
                            <Input
                                type="password"
                                placeholder="Confirm your new password"
                            />
                        </FormControl>
                        <Button
                            onClick={handlePasswordChange}
                            colorScheme="green"
                        >
                            Save Changes
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Box w="100%">
                <Text
                    color={"GrayText"}
                    fontStyle={"oblique"}
                    fontSize={"xl"}
                    fontWeight={"bold"}
                    mt={4}
                >
                    Admins
                </Text>
                <Button colorScheme="teal" m={5}>
                    Add An Admin
                </Button>

                <Center>
                    <Table ml={4}>
                        <Thead>
                            <Tr>
                                <Th></Th>
                                <Th>Name</Th>
                                <Th>Email</Th>
                                <Th>Function</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {users.map((user, index) => (
                                <Tr key={user.id}>
                                    <Td mr={1}>{index + 1}.</Td>
                                    <Td>{user.name}</Td>
                                    <Td>{"admin@gmail.com"}</Td>

                                    <Td>
                                        <Button colorScheme="orange">
                                            Disable
                                        </Button>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Center>

                {selectedUser && (
                    <AddCompanyModalForCoodinator
                        isOpen={isAddingCompany}
                        onClose={() => setIsAddingCompany(false)}
                        user={selectedUser}
                        onSubmit={handleAddCompany}
                    />
                )}
            </Box>
        </Flex>
    );
};

export default AdminAccountsTab;
