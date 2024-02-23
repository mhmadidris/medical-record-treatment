"use client"

import { Box, Text, VStack, Flex, Divider } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartPie, faUserGroup, faPills, faStethoscope } from "@fortawesome/free-solid-svg-icons";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
    { name: "Dashboard", href: "/dashboard", icon: faChartPie },
    { name: "Patient", href: "/patients", icon: faUserGroup },
    { name: "Treatment", href: "/treatment", icon: faStethoscope },
    { name: "Medicine", href: "/medicine", icon: faPills },
];

export default function Sidebar() {
    const pathName = usePathname();

    const isActive = (href: string) => pathName.startsWith(href);

    return (
        <Box
            bg="white"
            w={250}
            minHeight="100vh"
            color="black"
            position="fixed"
            top="0"
            left="0"
            boxShadow="xl"
            borderEndRadius={25}
        >
            <Box marginY={2.5}>
                <NextLink href="/" passHref>
                    <Text textAlign="center" fontSize={24} fontWeight="bold">
                        MEDICAL
                    </Text>
                </NextLink>
            </Box>
            <Divider />
            <VStack spacing="2" align="stretch" marginY={2.5} paddingX="2">
                {navLinks.map((link, index) => (
                    <NextLink href={link.href} key={index} passHref>
                        <Box
                            borderRadius={5}
                            px={15}
                            py={1.5}
                            fontSize={20}
                            bg={isActive(link.href) ? "#ecf3fd" : "transparent"}
                            color={isActive(link.href) ? "#4474f7" : "#8b95a1"}
                            borderStartColor={isActive(link.href) ? "#5e8bf9" : "transparent"}
                            borderStartWidth={5}
                            fontWeight={isActive(link.href) ? "bold" : "normal"}
                            _hover={{ bg: "#ecf3fd", color: "#5e8bf9" }}
                        >
                            <Flex align="center" gap={2}>
                                <FontAwesomeIcon icon={link.icon} fontSize={16} />
                                <Text marginLeft={2} fontSize={16}>{link.name}</Text>
                            </Flex>
                        </Box>
                    </NextLink>
                ))}
            </VStack>
        </Box>
    );
}
