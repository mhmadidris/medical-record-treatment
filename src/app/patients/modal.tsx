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
import ToastDisplay from "@/components/Toast";

interface ModalPatientsProps {
    isOpen: boolean;
    onClose: () => void;
    refreshData: () => void;
}

const ModalPatients: React.FC<ModalPatientsProps> = ({ isOpen, onClose, refreshData }) => {
    const [treatments, setTreatments] = useState<Treatment[]>([]);
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [newItem, setNewItem] = useState<Patient>({ patientID: '', patientName: '', date: new Date, treatmentIds: [], medicineIds: [], cost: 0 });
    const [date, setDate] = useState(new Date().toLocaleDateString("id-ID", { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' }));
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

    const validateForm = () => {
        let isValid = true;
        const errorsCopy = { ...errors };

        if (!newItem.patientID?.trim()) {
            errorsCopy.patientID = "Patient ID is required";
            isValid = false;
        } else {
            delete errorsCopy.patientID;
        }

        if (!newItem.patientName?.trim()) {
            errorsCopy.patientName = "Patient Name is required";
            isValid = false;
        } else {
            delete errorsCopy.patientName;
        }

        if (newItem.treatmentIds?.length === 0) {
            errorsCopy.treatmentIds = "Please select at least one treatment";
            isValid = false;
        } else {
            delete errorsCopy.treatmentIds;
        }

        if (newItem.medicineIds?.length === 0) {
            errorsCopy.medicineIds = "Please select at least one medicine";
            isValid = false;
        } else {
            delete errorsCopy.medicineIds;
        }

        if (newItem.cost <= 0) {
            errorsCopy.cost = "Cost must be greater than zero";
            isValid = false;
        } else {
            delete errorsCopy.cost;
        }

        setErrors(errorsCopy);
        return isValid;
    };

    const handleSave = async () => {
        setIsLoading(true);
        try {
            if (validateForm()) {
                await createPatient({
                    ...newItem,
                    date: new Date(date)
                });
                setNewItem({ patientID: '', patientName: '', date: new Date(), treatmentIds: [], medicineIds: [], cost: 0 });
                onClose();
                refreshData();
            }
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
                            {errors.patientID && <Text color="red">{errors.patientID}</Text>}
                        </Box>
                        <Box>
                            <Text>Patient Name</Text>
                            <Input placeholder="e.g: John Smith" size="md" onChange={(e) => setNewItem({ ...newItem, patientName: e.target.value })} />
                            {errors.patientName && <Text color="red">{errors.patientName}</Text>}
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
                            {errors.treatmentIds && <Text color="red">{errors.treatmentIds}</Text>}
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
                            {errors.medicineIds && <Text color="red">{errors.medicineIds}</Text>}
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
                            {errors.cost && <Text color="red">{errors.cost}</Text>}
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
