"use client"

import LayoutPanel from "@/components/Layouts";
import { Box, Button, Container, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import ModalPatients from "./modal";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DrawerPatients from "./drawer";
import { useEffect, useRef, useState } from "react";
import { Patient } from "@/models/Patient";
import { deletePatient, getAllPatients } from "@/controllers/patientController";
import { moneyFormatter } from "@/providers/Currency";

export default function Patients() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenDrawer, onOpen: onOpenDrawer, onClose: onCloseDrawer } = useDisclosure();
    const [loading, setLoading] = useState<boolean>(true);
    const btnRef = useRef<HTMLButtonElement>(null);

    const [patients, setPatients] = useState<Patient[]>([]);

    useEffect(() => {
        async function fetchPatients() {
            try {
                const patientsData = await getAllPatients();
                setPatients(patientsData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching patients:", error);
                setLoading(false);
            }
        }

        fetchPatients();
    }, []);

    const handleDelete = async (patientId: any) => {
        try {
            const success = await deletePatient(patientId);
            if (success) {
                setPatients(prevPatients => prevPatients.filter(patient => patient.id !== patientId));
            } else {

            }
        } catch (error) {
            console.error("Error deleting patient:", error);
        }
    };

    const updatePatientsList = () => {
        patients;
    };

    return (
        <LayoutPanel>
            <Box width={{ base: '100%', md: 'auto' }}>
                <Flex
                    direction={{ base: "column-reverse", md: "row" }}
                    align={{ base: "stretch", md: "center" }}
                    justify={{ base: "stretch", md: "space-between" }}
                    gap={5}
                >
                    <Input placeholder='Search Patient ID / Patient Name' size='md' backgroundColor="white" color="black" shadow="xs" marginBottom={{ base: 5, md: 0 }} />
                    <Button onClick={onOpen} backgroundColor="#6488ea" size="md" boxShadow="lg">
                        Add Patients
                    </Button>
                </Flex>
            </Box>

            {loading ? (
                <Text>Loading...</Text>
            ) : patients.length === 0 ? (
                <Text>No patients available</Text>
            ) :
                <TableContainer
                    marginTop={5}
                    backgroundColor="white"
                    borderRadius={10}
                    boxShadow="md"
                    overflowX={{ base: 'auto', md: 'hidden' }}
                    width={{ base: '100%', md: 'auto' }}
                >
                    <Table size={{ base: 'sm', md: 'md' }}>
                        <Thead backgroundColor="#ecf3fd">
                            <Tr>
                                <Th width={{ base: '10%', md: '5%' }} fontWeight="bold" fontSize={16} textAlign="center">#</Th>
                                <Th fontWeight="bold" fontSize={16}>Name</Th>
                                <Th fontWeight="bold" fontSize={16}>Date</Th>
                                <Th fontWeight="bold" fontSize={16}>Cost</Th>
                                <Th fontWeight="bold" fontSize={16} textAlign="center">Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {patients.map((patient, index) => (
                                <Tr>
                                    <Td width={{ base: '10%', md: '5%' }} fontWeight="bold" fontSize={14} textAlign="center">
                                        {index + 1}
                                    </Td>
                                    <Td>
                                        <Text fontWeight="semibold" fontSize={16}>
                                            {patient.patientName}
                                        </Text>
                                        <Text fontWeight="normal" fontSize={13}>
                                            Patient ID: {patient.patientID}
                                        </Text>
                                    </Td>
                                    <Td fontWeight="normal" fontSize={14}>
                                        {new Date(patient.date).toLocaleDateString("en-US", {
                                            weekday: 'short',
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </Td>
                                    <Td fontWeight="normal" fontSize={14}>
                                        {moneyFormatter(patient.cost, "IDR", 0)}
                                    </Td>
                                    <Td fontWeight="bold" fontSize={14} textAlign="center">
                                        <Flex justifyContent="center" alignContent="center" gap={3}>
                                            <Button backgroundColor="#5e8bf9" color="white" size="sm" ref={btnRef} colorScheme='teal' onClick={onOpenDrawer}>
                                                <FontAwesomeIcon icon={faEye} />
                                            </Button>
                                            <Button backgroundColor="red" color="white" size="sm" onClick={() => handleDelete(patient.id)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </Button>
                                        </Flex>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            }

            <ModalPatients isOpen={isOpen} onClose={onClose} updatePatientsList={updatePatientsList} />
            <DrawerPatients isOpen={isOpenDrawer} onClose={onCloseDrawer} />
        </LayoutPanel>
    );
}
