'use client'

import LayoutPanel from "@/components/Layouts";
import { useDisclosure, Flex, Input, Button, Box } from "@chakra-ui/react";
import TableTreatment from "./table";
import { getAllTreatments } from "@/controllers/treatmentController";
import { useState } from "react";

export default function Treatment() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [searchParam, searchQuery] = useState('');

    return (
        <LayoutPanel>
            <Box width={{ base: '100%', md: 'auto' }}>
                <Flex
                    direction={{ base: "column-reverse", md: "row" }}
                    align={{ base: "stretch", md: "center" }}
                    justify={{ base: "stretch", md: "space-between" }}
                    gap={5}
                >
                    <Input
                        placeholder='Search Treatment...'
                        size='md'
                        backgroundColor="white"
                        color="black"
                        shadow="xs"
                        value={searchParam}
                        onChange={(e) => searchQuery(e.target.value)}
                        marginBottom={{ base: 5, md: 0 }}
                    />
                    <Button
                        onClick={onOpen}
                        backgroundColor="#6488ea"
                        size="md"
                        boxShadow="lg"
                    >
                        Add Treatment
                    </Button>
                </Flex>
            </Box>

            <TableTreatment isOpen={isOpen} onClose={onClose} searchParam={searchParam} />
        </LayoutPanel>
    );
}
