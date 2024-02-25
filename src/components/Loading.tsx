import { Center, CircularProgress, Box } from "@chakra-ui/react";

export default function Loading() {
    return (
        <Center h="100vh">
            <CircularProgress isIndeterminate color="green.300" />
        </Center>
    );
}