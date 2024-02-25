"use client"

import React, { useState, useEffect } from "react";
import LayoutPanel from "@/components/Layouts";
import { Box, Button, Card, CardBody, Container, Flex, Image, Input, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";
import ModalMedicine from "./modal";
import { faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteMedicine, getAllMedicines } from "@/controllers/medicineController";
import { Medicine } from "@/models/Medicine";
import { moneyFormatter } from "../../providers/Currency";

export default function Medicine() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading, setLoading] = useState<boolean>(true);
    const [medicines, setMedicines] = useState<Medicine[]>([]);

    useEffect(() => {
        async function fetchMedicines() {
            try {
                const medicinesData = await getAllMedicines();
                setMedicines(medicinesData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching medicines:", error);
                setLoading(false);
            }
        }

        fetchMedicines();
    }, []);

    const handleDelete = async (medicineId: any) => {
        try {
            const success = await deleteMedicine(medicineId);
            if (success) {
                setMedicines(prevMedicines => prevMedicines.filter(medicine => medicine.id !== medicineId));
            } else {

            }
        } catch (error) {
            console.error("Error deleting medicine:", error);
        }
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
                    <Input placeholder='Search Medicine' size='md' backgroundColor="white" color="black" shadow="xs" />
                    <Button onClick={onOpen} backgroundColor="#6488ea" size="md" boxShadow="lg">
                        Add Medicine
                    </Button>
                </Flex>
            </Box>

            <SimpleGrid
                marginTop={5}
                columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
                spacingX='25px'
                spacingY='20px'
            >
                {medicines.map((medicine, index) => (
                    <Card key={index}>
                        <CardBody>
                            <Image src={medicine.image} borderRadius={5} alt="Image" w="100%" h={150} objectFit="cover" loading="lazy" />
                            <Flex flexDir="column" marginY={2} gap={1}>
                                <Text fontWeight="bold" fontSize={16}>{medicine.title}</Text>
                                <Text fontWeight="medium" fontSize={14}>
                                    {moneyFormatter(medicine.price, "IDR", 0)}
                                </Text>
                            </Flex>
                            <Flex justifyContent="space-around" marginTop={2.5}>
                                <Button backgroundColor="#4474f7" color="white" size="sm">
                                    <FontAwesomeIcon icon={faPen} />
                                    <Text ms={2}>Edit</Text>
                                </Button>
                                <Button backgroundColor="red" color="white" size="sm" onClick={handleDelete}>
                                    <FontAwesomeIcon icon={faTrash} />
                                    <Text ms={2}>Delete</Text>
                                </Button>
                            </Flex>
                        </CardBody>
                    </Card>
                ))}
            </SimpleGrid>


            <ModalMedicine isOpen={isOpen} onClose={onClose} />
        </LayoutPanel>
    );
}
