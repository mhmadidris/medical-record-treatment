import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "./Sidebar";

export default function LayoutPanel({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Flex minH="100vh" style={{ backgroundColor: "#f6f7fb" }}>
            <Sidebar />
            <Box flex="1" marginStart={250} marginY={5} paddingX={5}>{children}</Box>
        </Flex>
    );
}
