import { VStack, Text, Box, Button, Flex } from "@chakra-ui/react";
import { FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

function VerfyTheEmail() {
    return (
        <Flex justifyContent="center" alignItems="center" h="100vh">
            <VStack
                spacing={8}
                align="center"
                maxWidth="600px"
                w="100%"
                px={8}
                margin={4}
                py={12}
                bg="white"
                rounded="md"
                shadow="xl"
            >
                <Box as={FaEnvelope} size="64px" color="blue.500" />
                <Text fontSize="xl" fontWeight="bold" textAlign="center">
                    Please verify your email address
                </Text>
                <Text fontSize="lg" textAlign="center">
                    We have sent a verification link to your email. Please check
                    your inbox and click the link to verify your email address.
                </Text>
                <Button as={Link} colorScheme="blue" size="lg" to="/">
                    Go back to Login
                </Button>
            </VStack>
        </Flex>
    );
}

export default VerfyTheEmail;
