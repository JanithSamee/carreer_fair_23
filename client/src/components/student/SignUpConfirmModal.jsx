import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    useToast,
    Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { WarningTwoIcon } from "@chakra-ui/icons";

function SignUpConfirmModal(props) {
    const { isOpen, onConfirm, onClose, data } = props;
    const [confirmText, setConfirmText] = useState("");
    const [loading, setloading] = useState(false);
    // const [isConfirmed, setIsConfirmed] = useState(false);
    const toast = useToast();

    const handleConfirmTextChange = (event) => {
        setConfirmText(event.target.value);
    };

    const handleConfirm = async () => {
        if (confirmText === "confirm") {
            // setIsConfirmed(true);
            setloading(true);
            await onConfirm();
            setloading(false);
            onClose();
        } else {
            toast({
                title: "Invalid confirmation text",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent m={1}>
                <ModalHeader>Confirm your information</ModalHeader>
                <ModalCloseButton onClick={onClose} />
                <ModalBody>
                    <Box
                        bg="yellow.100"
                        border="1px solid yellow.300"
                        borderRadius="md"
                        p={4}
                        mt={4}
                        display="flex"
                        alignItems="center"
                        flexDir={"column"}
                    >
                        <Box display={"flex"} alignItems={"baseline"}>
                            <WarningTwoIcon color="yellow.800" mr={2} />
                            <Text color="yellow.800" fontWeight="bold">
                                Warning
                            </Text>
                        </Box>

                        <Text color="yellow.800" ml={2}>
                            {
                                "The information you have entered is non-editable. Please review it carefully before submitting."
                            }
                        </Text>
                    </Box>
                    <Box bg="green.100" p={4} rounded="md" mt={4}>
                        <Text fontWeight="bold" mb={2}>
                            User Information:
                        </Text>
                        <Box pl={4}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <strong>Email</strong>
                                        </td>
                                        <td>:{data.email}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Index Number</strong>
                                        </td>
                                        <td>:{data.indexNumber}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Username</strong>
                                        </td>
                                        <td>:{data.username}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Box>
                    </Box>
                    <FormControl id="confirm" mb={4} mt={4}>
                        <FormLabel>Type "confirm" below to proceed.</FormLabel>
                        <Input
                            type="text"
                            value={confirmText}
                            onChange={handleConfirmTextChange}
                        />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose} mr={4}>
                        Cancel
                    </Button>
                    <Button
                        isLoading={loading}
                        colorScheme="blue"
                        onClick={handleConfirm}
                        isDisabled={confirmText !== "confirm"}
                    >
                        Proceed
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default SignUpConfirmModal;
