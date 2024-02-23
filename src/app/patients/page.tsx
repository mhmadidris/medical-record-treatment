"use client"

import LayoutPanel from "@/components/Layouts";
import { Box, Button, Container, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import ModalPatients from "./modal";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DrawerPatients from "./drawer";
import { useRef } from "react";

export default function Patients() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenDrawer, onOpen: onOpenDrawer, onClose: onCloseDrawer } = useDisclosure();
    const btnRef = useRef<HTMLButtonElement>(null);

    return (
        <LayoutPanel>
            <Box>
                <Flex alignContent="space-between" gap={5}>
                    <Input placeholder='Search Patient ID / Patient Name' size='md' backgroundColor="white" color="black" shadow="xs" />
                    <Button onClick={onOpen} backgroundColor="#6488ea" size="md" boxShadow="lg">
                        Add Patients
                    </Button>
                </Flex>
            </Box>

            <TableContainer marginTop={5} backgroundColor="white" borderRadius={10} boxShadow="md">
                <Table size='md'>
                    <Thead backgroundColor="#ecf3fd">
                        <Tr>
                            <Th width={1} fontWeight="bold" fontSize={16} textAlign="center">#</Th>
                            <Th fontWeight="bold" fontSize={16}>Name</Th>
                            <Th fontWeight="bold" fontSize={16}>Date</Th>
                            <Th fontWeight="bold" fontSize={16}>Cost</Th>
                            <Th fontWeight="bold" fontSize={16} textAlign="center">Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td width={1} fontWeight="bold" fontSize={14} textAlign="center">1</Td>
                            <Td>
                                <Text fontWeight="semibold" fontSize={16}>
                                    John Smith
                                </Text>
                                <Text fontWeight="normal" fontSize={13}>
                                    Patient ID: P-1234
                                </Text>
                            </Td>
                            <Td fontWeight="normal" fontSize={14}>
                                Wed, 12 February 2024
                            </Td>
                            <Td fontWeight="normal" fontSize={14}>
                                Rp 25.000
                            </Td>
                            <Td fontWeight="bold" fontSize={14} textAlign="center" w={100}>
                                <Flex alignContent="space-between" gap={3}>
                                    <Button backgroundColor="#5e8bf9" color="white" size="sm" ref={btnRef} colorScheme='teal' onClick={onOpenDrawer}>
                                        <FontAwesomeIcon icon={faEye} />
                                    </Button>
                                    <Button backgroundColor="red" color="white" size="sm">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                </Flex>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>

            <ModalPatients isOpen={isOpen} onClose={onClose} />
            <DrawerPatients isOpen={isOpenDrawer} onClose={onCloseDrawer} />
        </LayoutPanel>
    );
}
