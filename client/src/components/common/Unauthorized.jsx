import { Box, Center, Heading, Icon, Button } from "@chakra-ui/react";
import { FaLock } from "react-icons/fa";
import useAuth from "../../utils/providers/AuthProvider";

export default function Unauthorized() {
    const { logout } = useAuth();
    return (
        <Center h="100vh">
            <Box textAlign="center">
                <Icon as={FaLock} fontSize="6xl" mb="4" />
                <Heading as="h1" size="xl" mb="4">
                    Unauthorized Access
                </Heading>
                <p>
                    Sorry, you do not have permission to access this page.
                    Please log in or contact an administrator for assistance.
                </p>
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
        </Center>
    );
}
