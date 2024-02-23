"use client"

import LayoutPanel from "@/components/Layouts";
import { Box, Button, Container, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import ModalTreatment from "./modal";

export default function Treatment() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <LayoutPanel>
            <Box>
                <Flex alignContent="space-between" gap={5}>
                    <Input placeholder='Search Patient ID / Patient Name' size='md' backgroundColor="white" color="black" shadow="xs" />
                    <Button onClick={onOpen} backgroundColor="#6488ea" size="md" boxShadow="lg">
                        Add Treatment
                    </Button>
                </Flex>
            </Box>

            <TableContainer marginTop={5} backgroundColor="white" borderRadius={10} boxShadow="md">
                <Table size='md'>
                    <Thead backgroundColor="#ecf3fd">
                        <Tr>
                            <Th width={1} fontWeight="bold" fontSize={16} textAlign="center">#</Th>
                            <Th fontWeight="bold" fontSize={16}>Name</Th>
                            <Th fontWeight="bold" fontSize={16}>Price</Th>
                            <Th fontWeight="bold" fontSize={16} textAlign="center">Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td width={1} fontWeight="bold" fontSize={14} textAlign="center">1</Td>
                            <Td fontWeight="normal" fontSize={14}>
                                Therapy
                            </Td>
                            <Td fontWeight="normal" fontSize={14}>
                                Rp 25.000
                            </Td>
                            <Td fontWeight="bold" fontSize={14} textAlign="center" w={100}>
                                <Flex alignContent="space-between" gap={3}>
                                    <Button backgroundColor="#5e8bf9" color="white" size="sm" colorScheme='teal'>
                                        <FontAwesomeIcon icon={faPen} />
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

            <ModalTreatment isOpen={isOpen} onClose={onClose} />
        </LayoutPanel>
    );
}
