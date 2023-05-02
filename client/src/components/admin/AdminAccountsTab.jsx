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
    FormErrorMessage,
    useToast,
    Spinner,
} from "@chakra-ui/react";
import { AddCompanyModalForCoodinator } from "./AddCompanyModalForCoodinator";
import useAuth from "../../utils/providers/AuthProvider";
import { updatePassword } from "firebase/auth";
import { auth } from "../../utils/firebase/firebaseConfig";
import { useEffect } from "react";
import { getAllAdmins } from "../../utils/api/admin.api";
import AddAdminModal from "./AddAdminModal";

const AdminAccountsTab = () => {
    const { logout, user } = useAuth();
    const toast = useToast();
    const [loading, setloading] = useState(false);
    const [loadingGet, setloadingGet] = useState(false);
    const [formInputUpdatePW, setformInputUpdatePW] = useState("");
    const [formErrorUpdatePW, setformErrorUpdatePW] = useState("");
    const [users, setUsers] = useState([]);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleSubmitUpdatePW = async (event) => {
        event.preventDefault();
        setloading(true);
        setformErrorUpdatePW("");

        if (
            formInputUpdatePW.newPassword !== formInputUpdatePW.confirmPassword
        ) {
            setloading(false);

            return setformErrorUpdatePW("Password Does not Match!");
        }
        if (
            !formInputUpdatePW.newPassword ||
            !formInputUpdatePW.confirmPassword
        ) {
            setloading(false);

            return setformErrorUpdatePW("Invalid Inputs");
        }

        try {
            await updatePassword(
                auth.currentUser,
                formInputUpdatePW.newPassword
            );
            setloading(false);
            onClose();
            toast({
                title: "Password updated!",
                description: "Your password has been updated successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            setloading(false);
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    useEffect(() => {
        async function getData() {
            setloadingGet(true);
            const res = await getAllAdmins();
            setloadingGet(false);
            if (res.error) {
                //TODO: add toast
                return;
            }
            setUsers(res.data);
        }
        getData();
    }, []);

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
                        readOnly
                        defaultValue={user && user.displayName}
                    />
                </FormControl>
                <FormControl mb={4}>
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        placeholder="Enter your email address"
                        readOnly
                        defaultValue={user && user.email}
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
                        {/* <FormControl mb={4}>
                            <FormLabel>Current Password</FormLabel>
                            <Input
                                type="password"
                                placeholder="Enter your current password"
                            />
                        </FormControl> */}
                        <FormControl mb={4}>
                            <FormLabel>New Password</FormLabel>
                            <Input
                                type="password"
                                placeholder="Enter your new password"
                                onChange={(e) =>
                                    setformInputUpdatePW({
                                        ...formInputUpdatePW,
                                        confirmPassword: e.target.value,
                                    })
                                }
                            />
                        </FormControl>
                        <FormControl mb={4} isInvalid={formErrorUpdatePW}>
                            <FormLabel>Confirm New Password</FormLabel>
                            <Input
                                type="password"
                                placeholder="Confirm your new password"
                                onChange={(e) =>
                                    setformInputUpdatePW({
                                        ...formInputUpdatePW,
                                        newPassword: e.target.value,
                                    })
                                }
                            />
                            {formErrorUpdatePW && (
                                <FormErrorMessage>
                                    {formErrorUpdatePW}
                                </FormErrorMessage>
                            )}
                        </FormControl>
                        <Button
                            onClick={handleSubmitUpdatePW}
                            colorScheme="green"
                            isLoading={loading}
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
                <AddAdminModal></AddAdminModal>

                <Center>
                    <Table ml={4}>
                        <Thead>
                            <Tr>
                                <Th></Th>
                                <Th>Email</Th>
                                <Th>Function</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {loadingGet && (
                                <Tr>
                                    <Td>
                                        <Spinner></Spinner>
                                    </Td>
                                </Tr>
                            )}
                            {users.map((user, index) => (
                                <Tr key={user.adminId}>
                                    <Td mr={1}>{index + 1}.</Td>
                                    <Td>{user && user.email}</Td>

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
            </Box>
        </Flex>
    );
};

export default AdminAccountsTab;
