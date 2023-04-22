import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Image,
    useBreakpointValue,
    FormErrorMessage,
    FormHelperText,
    Toast,
    useToast,
    useDisclosure,
} from "@chakra-ui/react";
import { backgroundSignUp, esocLogo } from "../assets/exportAssets";
import { useState } from "react";
import useAuth from "../utils/providers/AuthProvider";
import { signUpStudent } from "../utils/api/student.api";
import { Link, useNavigate } from "react-router-dom";
import SignUpConfirmModal from "../components/student/SignUpConfirmModal";

function SignUp() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigator = useNavigate();
    const { signIn } = useAuth();
    const isMobile = useBreakpointValue({ base: true, sm: false });
    const toast = useToast();
    const [formInputs, setformInputs] = useState({
        email: "",
        password: "",
        indexNumber: "",
        username: "",
        confirmPassword: "",
    });
    const [formError, setformError] = useState({ error: false, message: "" });
    const [_loading, setLoading] = useState(false);

    function handleInputs() {
        if (
            !formInputs.email ||
            !formInputs.password ||
            !formInputs.username ||
            !formInputs.indexNumber ||
            !formInputs.confirmPassword
        ) {
            setformError({
                error: true,
                message: "All fields are required!",
            });
        } else if (formInputs.password !== formInputs.confirmPassword) {
            setformError({
                error: true,
                message: "Password and Confirm Password must match!",
            });
        } else {
            onOpen();
        }
        return setLoading(false);
    }

    async function handleSubmit() {
        try {
            setLoading(true);
            const _res = await signUpStudent(formInputs);

            if (_res.error) {
                toast({
                    title: "An error occurred.",
                    description: _res.data,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            } else {
                navigator("/");
            }

            setLoading(false);
            setformError({ error: false, message: "" });
        } catch (error) {
            toast({
                title: "An error occurred.",
                description: error.message,
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
        return setLoading(false);
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgImage={`url(${backgroundSignUp})`}
            bgSize="cover"
            h="100vh"
            w="100%"
            zIndex={-1}
            // opacity={0.6}
        >
            <Box
                bg="white"
                borderRadius="md"
                p={8}
                m={4}
                w={isMobile ? "100%" : "sm"}
            >
                <Box
                    mb={4}
                    display="flex"
                    justifyContent={"center"}
                    w={"100%"}
                    alignItems={"center"}
                >
                    <Image src={esocLogo} height="72px" alt="Logo" />
                </Box>
                <FormControl
                    id="email"
                    isRequired
                    mb={4}
                    isInvalid={formError.error}
                >
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        onChange={(e) =>
                            setformInputs({
                                ...formInputs,
                                email: e.target.value,
                            })
                        }
                    />
                </FormControl>

                <FormControl
                    id="username"
                    isRequired
                    mb={4}
                    isInvalid={formError.error}
                >
                    <FormLabel>Username</FormLabel>
                    <Input
                        type="text"
                        onChange={(e) =>
                            setformInputs({
                                ...formInputs,
                                username: e.target.value,
                            })
                        }
                    />
                </FormControl>
                <FormControl
                    id="indexNumber"
                    isRequired
                    mb={4}
                    isInvalid={formError.error}
                >
                    <FormLabel>Index Number</FormLabel>
                    <Input
                        type="text"
                        onChange={(e) =>
                            setformInputs({
                                ...formInputs,
                                indexNumber: e.target.value,
                            })
                        }
                    />
                </FormControl>
                <FormControl
                    id="password"
                    isRequired
                    mb={4}
                    isInvalid={formError.error}
                >
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        onChange={(e) =>
                            setformInputs({
                                ...formInputs,
                                password: e.target.value,
                            })
                        }
                    />
                </FormControl>
                <FormControl
                    id="confirmPassword"
                    isRequired
                    mb={4}
                    isInvalid={formError.error}
                >
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                        type="password"
                        onChange={(e) =>
                            setformInputs({
                                ...formInputs,
                                confirmPassword: e.target.value,
                            })
                        }
                    />
                    {formError.error && (
                        <FormErrorMessage>{formError.message}</FormErrorMessage>
                    )}
                </FormControl>

                {/* <Button
                    colorScheme="blue"
                    width="100%"
                    onClick={handleSubmit}
                    isLoading={_loading}
                    loadingText={"Loading"}
                >
                    Sign Up
                </Button> */}
                <SignUpConfirmModal
                    isOpen={isOpen}
                    onClose={onClose}
                    onConfirm={handleSubmit}
                    data={formInputs}
                ></SignUpConfirmModal>
                <Button
                    colorScheme="blue"
                    width="100%"
                    onClick={handleInputs}
                    isLoading={_loading}
                    loadingText={"Loading"}
                >
                    Sign Up
                </Button>
                <Box textAlign="center" mt={4}>
                    <Button color="blue.500" variant="link" as={Link} to={"/"}>
                        Already have account?
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default SignUp;
