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
import { addCoordinator } from "../../utils/api/coordinator.api";

function AddCoordinatorModal({ isChanged }) {
    const toast = useToast();
    const [email, setEmail] = useState("");
    const [phone, setphone] = useState("");
    const [name, setname] = useState("");
    const [loading, setloading] = useState(false);
    const [password, setPassword] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleSubmit = async () => {
        setloading(true);
        const res = await addCoordinator({ email, password, phone, name });
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

        isChanged && isChanged((prev) => !prev);
        onClose();
        setEmail("");
        setPassword("");
    };

    return (
        <>
            <Button colorScheme="teal" m={5} onClick={onOpen}>
                Add A Coordinator
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Coordinator</ModalHeader>
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
                        <FormControl isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input
                                type="text"
                                placeholder="Enter Name"
                                value={name}
                                onChange={(event) =>
                                    setname(event.target.value)
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
                            <FormLabel>Phone Number</FormLabel>
                            <Input
                                type="tel"
                                placeholder="Enter Phone Number"
                                value={phone}
                                onChange={(event) =>
                                    setphone(event.target.value)
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

export default AddCoordinatorModal;
