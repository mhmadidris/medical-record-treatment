import Loading from "@/components/Loading";
import { getPatientDetail } from "@/controllers/patientController";
import { Patient } from "@/models/Patient";
import { moneyFormatter } from "@/providers/Currency";
import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Text, Divider, Box, Flex, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Accordion, Card, CardBody, SimpleGrid, Image } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

interface DrawerPatientsProps {
    isOpen: boolean;
    onClose: () => void;
    patientId?: any;
}

const DrawerPatients: React.FC<DrawerPatientsProps> = ({ isOpen, onClose, patientId }) => {
    const btnRef = useRef<HTMLButtonElement>(null);
    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchDetailPatient() {
            setLoading(true);
            try {
                if (patientId) {
                    const patientDetail: Patient | null = await getPatientDetail(patientId);
                    if (patientDetail) {
                        setPatients([patientDetail]);
                        setLoading(false);
                    } else {
                        setLoading(false);
                    }
                }
            } catch (error) {
                console.error("Error fetching patient detail:", error);
                setLoading(false);
            }
        }

        fetchDetailPatient();
    }, [patientId]);

    return (
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            finalFocusRef={btnRef}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Detail Patient</DrawerHeader>
                <Divider />
                {loading ? (
                    <Loading />
                ) :
                    <DrawerBody>
                        {patients.map((patient, index) => (
                            <Flex flexDir="column" gap={3}>
                                <Box>
                                    <Text fontSize={14} fontWeight="normal">Patient ID:</Text>
                                    <Text fontSize={15} fontWeight="bold">
                                        {patient.patientID}
                                    </Text>
                                </Box>
                                <Box>
                                    <Text fontSize={14} fontWeight="normal">Name:</Text>
                                    <Text fontSize={15} fontWeight="bold">
                                        {patient.patientName}
                                    </Text>
                                </Box>
                                <Box>
                                    <Text fontSize={14} fontWeight="normal">Date of Treatment:</Text>
                                    <Text fontSize={15} fontWeight="bold">
                                        {new Date(patient.date).toLocaleDateString("en-US", {
                                            weekday: 'short',
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </Text>
                                </Box>
                                <Box>
                                    <Text fontSize={14} fontWeight="normal">Cost of Treatment:</Text>
                                    <Text fontSize={15} fontWeight="bold">
                                        {moneyFormatter(patient.cost, "IDR", 0)}
                                    </Text>
                                </Box>

                                <Accordion defaultIndex={[0]} allowMultiple>
                                    <AccordionItem borderRadius={10} mb={2.5}>
                                        <h2>
                                            <AccordionButton backgroundColor="#6488ea" borderRadius={10} _hover={{ backgroundColor: '#6488ea' }}>
                                                <Box as="span" flex='1' textAlign='left' fontWeight="bold">
                                                    Treatment
                                                </Box>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel pb={4}>
                                            {patient.treatments && patient.treatments.map((item) => (
                                                <Box bg="grey" px={2} py={1} my={2} borderRadius={7.5} color="white" boxShadow="md">
                                                    <Text fontWeight="normal" fontSize={14}>
                                                        {item.treatment}
                                                    </Text>
                                                </Box>
                                            ))}
                                        </AccordionPanel>
                                    </AccordionItem>

                                    <AccordionItem borderRadius={10}>
                                        <h2>
                                            <AccordionButton backgroundColor="#6488ea" borderRadius={10} _hover={{ backgroundColor: '#6488ea' }}>
                                                <Box as="span" flex='1' textAlign='left' fontWeight="bold">
                                                    Medicine
                                                </Box>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel pb={4}>
                                            <SimpleGrid
                                                marginTop={0}
                                                columns={2}
                                                spacingX='12.5px'
                                                spacingY='12.5px'
                                            >
                                                {patient.medicines && patient.medicines.map((item) => (
                                                    <Card key={item.id}>
                                                        <CardBody m={0} p={2.5}>
                                                            <Image src={item.image} borderRadius={5} alt="Image" w="100%" h={75} objectFit="cover" loading="lazy" />
                                                            <Flex flexDir="column" marginY={2} gap={1}>
                                                                <Text fontWeight="bold" fontSize={12}>
                                                                    {item.title}
                                                                </Text>
                                                            </Flex>
                                                        </CardBody>
                                                    </Card>
                                                ))}
                                            </SimpleGrid>
                                        </AccordionPanel>
                                    </AccordionItem>
                                </Accordion>
                            </Flex>
                        ))}
                    </DrawerBody>
                }
            </DrawerContent>
        </Drawer>
    );
}

export default DrawerPatients;
