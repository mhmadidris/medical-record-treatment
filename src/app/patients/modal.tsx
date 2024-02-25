import { Box, Button, CircularProgress, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import React, { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { Medicine } from "@/models/Medicine";
import { getAllMedicines } from "@/controllers/medicineController";
import { Treatment } from "@/models/Treatment";
import { getAllTreatments } from "@/controllers/treatmentController";
import { Patient } from "@/models/Patient";
import { createPatient } from "@/controllers/patientController";

interface ModalPatientsProps {
    isOpen: boolean;
    onClose: () => void;
    updatePatientsList: () => void;
}

const ModalPatients: React.FC<ModalPatientsProps> = ({ isOpen, onClose, updatePatientsList }) => {
    const [treatments, setTreatments] = useState<Treatment[]>([]);
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [newItem, setNewItem] = useState<Patient>({ patientID: '', patientName: '', date: new Date, treatmentIds: [], medicineIds: [], cost: 0 });
    const [date, setDate] = useState(new Date().toLocaleDateString("id-ID", { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' }));
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchTreatments() {
            try {
                const treatmentsData = await getAllTreatments();
                setTreatments(treatmentsData);
            } catch (error) {
                console.error("Error fetching treatments:", error);
            }
        }

        async function fetchMedicines() {
            try {
                const medicinesData = await getAllMedicines();
                setMedicines(medicinesData);
            } catch (error) {
                console.error("Error fetching medicines:", error);
            }
        }

        fetchTreatments();
        fetchMedicines();
    }, []);

    const treatmentOptions = treatments.map((treatment) => ({
        value: treatment.id,
        label: treatment.treatment,
    }));

    const medicineOptions = medicines.map((medicine) => ({
        value: medicine.id,
        label: medicine.title,
    }));

    const handleSave = async () => {
        setIsLoading(true);
        try {
            await createPatient({
                ...newItem,
                date: new Date(date)
            });
            updatePatientsList();
            setNewItem({ patientID: '', patientName: '', date: new Date(), treatmentIds: [], medicineIds: [], cost: 0 });
            onClose();
        } catch (error) {
            console.error("Error saving patient:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="lg" isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Patient</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex flexDir="column" gap={4}>
                        <Box>
                            <Text>Patient ID</Text>
                            <Input placeholder="e.g: P-1234" size="md" onChange={(e) => setNewItem({ ...newItem, patientID: e.target.value })} />
                        </Box>
                        <Box>
                            <Text>Patient Name</Text>
                            <Input placeholder="e.g: John Smith" size="md" onChange={(e) => setNewItem({ ...newItem, patientName: e.target.value })} />
                        </Box>
                        <Box>
                            <Text>Date</Text>
                            <SingleDatepicker
                                name="date-input"
                                date={new Date(date)}
                                onDateChange={(newDate) => setDate(newDate.toLocaleDateString("id-ID", { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' }))}
                                configs={{
                                    dateFormat: 'EEEE, dd MMMM yyyy'
                                }}
                            />
                        </Box>
                        <Box>
                            <Text>Treatment</Text>
                            <Select
                                options={treatmentOptions}
                                isMulti
                                placeholder="Select treatment..."
                                onChange={(selectedOptions) => {
                                    const selectedTreatmentIds = selectedOptions.map(option => option.value).filter(value => typeof value === 'string') as string[];
                                    setNewItem({ ...newItem, treatmentIds: selectedTreatmentIds });
                                }}
                            />
                        </Box>
                        <Box>
                            <Text>Medicine</Text>
                            <Select
                                options={medicineOptions}
                                isMulti
                                placeholder="Select medicine..."
                                onChange={(selectedOptions) => {
                                    const selectedMedicineIds = selectedOptions.map(option => option.value).filter(value => typeof value === 'string') as string[];
                                    setNewItem({ ...newItem, medicineIds: selectedMedicineIds });
                                }}
                            />
                        </Box>
                        <Box>
                            <Text>Cost</Text>
                            <Flex alignItems="center">
                                <Text marginRight="2" marginLeft="2">IDR</Text>
                                <Input
                                    defaultValue={newItem.cost}
                                    onChange={(e) => {
                                        const cleanedValue = e.target.value.replace(/[^0-9.]/g, '');
                                        setNewItem({ ...newItem, cost: parseInt(cleanedValue) });
                                    }}
                                    placeholder="e.g: 200.000"
                                    textAlign="start"
                                    as={CurrencyInput}
                                    allowDecimals={true}
                                    decimalsLimit={2}
                                />
                            </Flex>
                        </Box>
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    {isLoading ? (
                        <CircularProgress isIndeterminate color="green.300" />
                    ) : (
                        <Button colorScheme='blue' onClick={handleSave}>Save</Button>
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ModalPatients;
