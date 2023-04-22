import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    FormErrorMessage,
    useToast,
} from "@chakra-ui/react";
import React from "react";
import {
    auth,
    sendPasswordResetEmail,
} from "../../utils/firebase/firebaseConfig";
import { formatError } from "../../utils/helpers/formatter";

export default function ForgotPasswordModal() {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef();
    const [email, setEmail] = React.useState("");
    const [loading, setloading] = React.useState(false);
    const [formError, setformError] = React.useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true);
        try {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setloading(false);

                return setformError("Please provide valid email!");
            }
            // Send password reset email to the user's email
            await sendPasswordResetEmail(auth, email);
            setloading(false);

            onClose();
            toast({
                title: "Password reset email sent! Check the email.",

                status: "success",
                duration: 8000,
                isClosable: true,
            });
        } catch (error) {
            setloading(false);
            toast({
                title: "An error occurred.",
                description: formatError(error).data,
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    };

    return (
        <>
            <Box textAlign="center" mt={4}>
                <Button color="blue.500" variant="link" onClick={onOpen}>
                    Forgot password?
                </Button>
            </Box>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                initialFocusRef={initialRef}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Forgot Password</ModalHeader>
                    <ModalBody>
                        <FormControl isInvalid={formError}>
                            <FormLabel>Email Address</FormLabel>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                ref={initialRef}
                            />
                            {formError && (
                                <FormErrorMessage>{formError}</FormErrorMessage>
                            )}
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            colorScheme="blue"
                            ml={3}
                            onClick={handleSubmit}
                            isLoading={loading}
                            loadingText={"Please wait..."}
                        >
                            Submit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
