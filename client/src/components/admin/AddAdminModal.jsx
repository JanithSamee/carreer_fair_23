import { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Button,
    useDisclosure,
    ModalFooter,
    useToast,
} from "@chakra-ui/react";
import { addAdmin } from "../../utils/api/admin.api";

function AddAdminModal({ users, setUsers }) {
    const toast = useToast();
    const [email, setEmail] = useState("");
    const [loading, setloading] = useState(false);
    const [password, setPassword] = useState("");
    const [secrete, setsecrete] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleSubmit = async () => {
        setloading(true);
        const res = await addAdmin({ email, password, create_token: secrete });
        setloading(false);
        if (res.error) {
            toast({
                title: "An error occurred.",
                description: res.data,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        window.location.reload();
        onClose();
        setEmail("");
        setPassword("");
        setsecrete("");
    };

    return (
        <>
            <Button colorScheme="teal" m={5} onClick={onOpen}>
                Add An Admin
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Admin</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                placeholder="Enter email address"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                            />
                        </FormControl>
                        <FormControl isRequired mt={4}>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                            />
                        </FormControl>
                        <FormControl isRequired mt={4}>
                            <FormLabel>Secret</FormLabel>
                            <Input
                                type="password"
                                placeholder="Enter password"
                                value={secrete}
                                onChange={(event) =>
                                    setsecrete(event.target.value)
                                }
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            isLoading={loading}
                            loadingText={"Loading.."}
                            onClick={handleSubmit}
                            type="submit"
                            mt={4}
                            ml="auto"
                            mr={0}
                            colorScheme="facebook"
                        >
                            Add
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default AddAdminModal;
