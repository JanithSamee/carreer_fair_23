import { Center, Spinner } from "@chakra-ui/react";

function LoadingPage() {
    return (
        <Center h="100vh">
            <Spinner size="xl" color="blue.500" />
        </Center>
    );
}

export default LoadingPage;
