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
} from "@chakra-ui/react";
import { backgroundImage, esocLogo } from "../assets/exportAssets";
import { useState } from "react";
import useAuth from "../utils/providers/AuthProvider";
import ForgotPasswordModal from "../components/common/ForgotPasswordModal";
import { Link } from "react-router-dom";

function Login() {
    const { signIn } = useAuth();
    const isMobile = useBreakpointValue({ base: true, sm: false });
    const toast = useToast();
    const [formInputs, setformInputs] = useState({ email: "", password: "" });
    const [formError, setformError] = useState({ error: false, message: "" });
    const [_loading, setLoading] = useState(false);

    async function handleSubmit() {
        if (!formInputs.email || !formInputs.password) {
            setformError({
                error: true,
                message: "Email and Password is required!",
            });
        } else {
            try {
                setLoading(true);
                await signIn(formInputs.email, formInputs.password);
                setformError({ error: false, message: "" });

                setLoading(false);
            } catch (error) {
                setLoading(false);

                toast({
                    title: "An error occurred.",
                    description: error.message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            }
        }
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgImage={`url(${backgroundImage})`}
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
                m={8}
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
                        placeholder="example@email.com"
                        onChange={(e) =>
                            setformInputs({
                                ...formInputs,
                                email: e.target.value,
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
                        placeholder="Password"
                        type="password"
                        onChange={(e) =>
                            setformInputs({
                                ...formInputs,
                                password: e.target.value,
                            })
                        }
                    />
                    {formError.error && (
                        <FormErrorMessage>{formError.message}</FormErrorMessage>
                    )}
                </FormControl>
                <Button
                    colorScheme="blue"
                    width="100%"
                    onClick={handleSubmit}
                    isLoading={_loading}
                    loadingText={"Loading"}
                >
                    Login
                </Button>

                <ForgotPasswordModal></ForgotPasswordModal>
                <Box textAlign="center" mt={4}>
                    <Button
                        color="blue.500"
                        variant="link"
                        as={Link}
                        to={"/signup"}
                    >
                        Don't have an account?
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default Login;
