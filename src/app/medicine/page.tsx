"use client"

import LayoutPanel from "@/components/Layouts";
import { Box, Button, Card, CardBody, Container, Flex, Image, Input, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";
import ModalMedicine from "./modal";
import { faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cardMedicine = [
    { name: "Paracetamol", price: "200.000", stock: 8, image: "https://source.unsplash.com/random/0" },
    { name: "Betadine", price: "760.000", stock: 913, image: "https://source.unsplash.com/random/1" },
    { name: "Vitamin C", price: "30.000", stock: 82, image: "https://source.unsplash.com/random/2" },
    { name: "Sakatonik ABC", price: "70.000", stock: 21, image: "https://source.unsplash.com/random/3" },
    { name: "Handsaplast", price: "90.000", stock: 65, image: "https://source.unsplash.com/random/4" },
];

export default function Medicine() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <LayoutPanel>
            <Box>
                <Flex alignContent="space-between" gap={5}>
                    <Input placeholder='Search Medicine' size='md' backgroundColor="white" color="black" shadow="xs" />
                    <Button onClick={onOpen} backgroundColor="#6488ea" size="md" boxShadow="lg">
                        Add Medicine
                    </Button>
                </Flex>
            </Box>

            <SimpleGrid marginTop={5} columns={4} spacingX='25px' spacingY='20px'>
                {cardMedicine.map((medicine, index) => (
                    <Card>
                        <CardBody>
                            <Image src={medicine.image} borderRadius={5} alt="Image" w="100%" h={150} objectFit="cover" loading="lazy" />
                            <Flex flexDir="column" marginY={2} gap={1}>
                                <Text fontWeight="bold" fontSize={16}>{medicine.name}</Text>
                                <Text fontWeight="medium" fontSize={14}>Rp {medicine.price}</Text>
                            </Flex>
                            <Flex justifyContent="space-around" marginTop={2.5}>
                                <Button backgroundColor="#4474f7" color="white" size="sm">
                                    <FontAwesomeIcon icon={faPen} />
                                    <Text ms={2}>Edit</Text>
                                </Button>
                                <Button backgroundColor="red" color="white" size="sm">
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
