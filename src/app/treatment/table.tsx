import React, { useState, useEffect } from "react";
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Flex, Button, Text } from "@chakra-ui/react";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { moneyFormatter } from "../../providers/Currency";
import { getAllTreatments, deleteTreatment } from "@/controllers/treatmentController";
import { Treatment } from "@/models/Treatment";
import NoData from "@/components/No-Data";
import Loading from "@/components/Loading";
import ModalTreatment from "./modal";

interface ModalTreatmentProps {
    isOpen: boolean;
    onClose: () => void;
    refreshData?: () => void;
}

const TableTreatment: React.FC<ModalTreatmentProps> = ({ isOpen, onClose, refreshData }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [treatments, setTreatments] = useState<Treatment[]>([]);

    useEffect(() => {
        fetchTreatments();
    }, []);

    const fetchTreatments = async () => {
        try {
            setLoading(true);
            const treatmentsData = await getAllTreatments();
            setTreatments(treatmentsData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching treatments:", error);
            setLoading(false);
        }
    };

    const handleDelete = async (treatmentId: any) => {
        try {
            const success = await deleteTreatment(treatmentId);
            if (success) {
                setTreatments(prevTreatments => prevTreatments.filter(treatment => treatment.id !== treatmentId));
            }
            fetchTreatments();
        } catch (error) {
            console.error("Error deleting treatment:", error);
        }
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : treatments.length === 0 ? (
                <NoData />
            ) : (
                <TableContainer
                    marginTop={5}
                    backgroundColor="white"
                    borderRadius={10}
                    boxShadow="md"
                    overflowX={{ base: 'auto', md: 'hidden' }}
                    width={{ base: '100%', md: 'auto' }}
                >
                    <Table size="sm">
                        <Thead backgroundColor="#ecf3fd">
                            <Tr>
                                <Th width={{ base: '25%', md: '10%' }} fontWeight="bold" fontSize={16} textAlign="center">#</Th>
                                <Th fontWeight="bold" fontSize={16}>Name</Th>
                                <Th fontWeight="bold" fontSize={16}>Price</Th>
                                <Th width={{ base: '25%', md: '30%' }} fontWeight="bold" fontSize={16} textAlign="center">Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {treatments.map((treatment, index) => (
                                <Tr key={treatment.id}>
                                    <Td fontWeight="bold" fontSize={14} textAlign="center">
                                        {index + 1}
                                    </Td>
                                    <Td fontWeight="normal" fontSize={14}>
                                        {treatment.treatment}
                                    </Td>
                                    <Td fontWeight="normal" fontSize={14}>
                                        {moneyFormatter(treatment.price, "IDR", 0)}
                                    </Td>
                                    <Td width={{ base: '25%', md: '30%' }} fontWeight="bold" fontSize={14} textAlign="center" w={100}>
                                        <Flex justifyContent="center" gap={3}>
                                            <Button backgroundColor="#5e8bf9" color="white" size="sm" colorScheme='teal'>
                                                <FontAwesomeIcon icon={faPen} />
                                            </Button>
                                            <Button backgroundColor="red" color="white" size="sm" onClick={() => handleDelete(treatment.id)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </Button>
                                        </Flex>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            )}
            <ModalTreatment isOpen={isOpen} onClose={onClose} refreshData={fetchTreatments} />
        </>
    );
}

export default TableTreatment;
