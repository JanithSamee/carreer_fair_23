import { Box, Center, Heading, Icon, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

export default function NotFound() {
    return (
        <Center h="100vh">
            <Box textAlign="center">
                <Icon as={FaExclamationTriangle} fontSize="6xl" mb="4" />
                <Heading as="h1" size="xl" mb="4">
                    404 - Page Not Found
                </Heading>
                <p>
                    Oops! Looks like you've stumbled onto a page that doesn't
                    exist.
                </p>
                <Button as={Link} to="/" colorScheme="red" mt={4}>
                    Go back home
                </Button>
            </Box>
        </Center>
    );
}
