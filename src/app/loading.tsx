import { Center, CircularProgress, Box } from "@chakra-ui/react";

export default function Loading() {
    return (
        <Box w="100vw" h="100vh">
            <Center>
                <CircularProgress color="red" />
            </Center>
        </Box>
    );
}