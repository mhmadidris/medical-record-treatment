"use client"

import LayoutPanel from "@/components/Layouts";
import Loading from "@/components/Loading";
import NoData from "@/components/No-Data";
import { getAllMedicines } from "@/controllers/medicineController";
import { getAllPatients } from "@/controllers/patientController";
import { getAllTreatments } from "@/controllers/treatmentController";
import { Medicine } from "@/models/Medicine";
import { Patient } from "@/models/Patient";
import { Treatment } from "@/models/Treatment";
import { Box, Center, Container, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { faPills, faStethoscope, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [patients, setPatients] = useState<Patient[]>([]);
    const [treatments, setTreatments] = useState<Treatment[]>([]);

    const [loading, setLoading] = useState<boolean>(true);

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

        async function fetchTreatments() {
            try {
                const treatmentsData = await getAllTreatments();
                setTreatments(treatmentsData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching treatments:", error);
                setLoading(false);
            }
        }

        fetchPatients();
        fetchMedicines();
        fetchTreatments();
    }, []);

    return (
        <LayoutPanel>
            <Text mb={2.5} fontWeight="bold" fontSize={24}>Dashboard</Text>

            {loading ? (
                <Loading />
            ) :
                <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(4, 1fr)']} gap={6}>
                    <GridItem h="auto" w="auto" bg='white' shadow="md" borderRadius={10} alignItems="center">
                        <Flex justifyContent="start" alignItems="center" p={5} alignSelf="center" h={100}>
                            <FontAwesomeIcon icon={faUserGroup} color="#3fddf2" fontSize="2.5rem" />
                            <Box ms={5}>
                                <Text fontSize={16}>{patients.length}</Text>
                                <Text fontWeight="bold" fontSize={16}>Patients</Text>
                            </Box>
                        </Flex>
                    </GridItem>
                    <GridItem h="auto" w="auto" bg='white' shadow="md" borderRadius={10} alignItems="center">
                        <Flex justifyContent="start" alignItems="center" p={5} alignSelf="center" h={100}>
                            <FontAwesomeIcon icon={faPills} color="#FDB0C0" fontSize="2.5rem" />
                            <Box ms={5}>
                                <Text fontSize={16}>{medicines.length}</Text>
                                <Text fontWeight="bold" fontSize={16}>Medicines</Text>
                            </Box>
                        </Flex>
                    </GridItem>
                    <GridItem h="auto" w="auto" bg='white' shadow="md" borderRadius={10} alignItems="center">
                        <Flex justifyContent="start" alignItems="center" p={5} alignSelf="center" h={100}>
                            <FontAwesomeIcon icon={faStethoscope} color="#B95D8D" fontSize="2.5rem" />
                            <Box ms={5}>
                                <Text fontSize={16}>{treatments.length}</Text>
                                <Text fontWeight="bold" fontSize={16}>Treatments</Text>
                            </Box>
                        </Flex>
                    </GridItem>
                </Grid>
            }
        </LayoutPanel>
    );
}
