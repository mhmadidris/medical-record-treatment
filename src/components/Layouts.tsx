import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import Loading from "./Loading";

export default function LayoutPanel({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <Flex minH="100vh" style={{ backgroundColor: "#f6f7fb" }}>
                    <Sidebar />
                    <Box flex="1" w={100} marginStart={{ base: 0, md: 250 }} marginY={{ base: 100, md: 5 }} paddingX={5}>{children}</Box>
                </Flex>
            )}
        </>
    );
}
