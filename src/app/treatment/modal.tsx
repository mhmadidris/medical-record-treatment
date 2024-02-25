import { Box, Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { createTreatment } from "../../controllers/treatmentController";
import { Treatment } from "../../models/Treatment";

interface ModalTreatmentProps {
    isOpen: boolean;
    onClose: () => void;
    refreshData: () => void;
}

const ModalTreatment: React.FC<ModalTreatmentProps> = ({ isOpen, onClose, refreshData }) => {
    const toast = useToast();
    const [newItem, setNewItem] = useState<Treatment>({ treatment: '', price: 0 });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleSave = async () => {
        try {
            if (validateForm()) {
                await createTreatment(newItem);
                setNewItem({ treatment: '', price: 0 });
                onClose();

                toast({
                    status: "success",
                    title: "Treatment",
                    description: "Success add treatment",
                    position: "top-right",
                    isClosable: true,
                });

                refreshData();
            } else {
                toast({
                    status: "info",
                    title: "Validation Form",
                    description: "Please complete data",
                    position: "top-right",
                    isClosable: true,
                });
            }
        } catch (error) {
            toast({
                status: "error",
                title: "Treatment",
                description: "failed add treatment",
                position: "top-right",
                isClosable: true,
            });

            console.error("Error saving treatment:", error);
        }
    };

    const validateForm = () => {
        let isValid = true;
        const errorsCopy = { ...errors };

        if (!newItem.treatment.trim()) {
            errorsCopy.treatment = "Treatment is required";
            isValid = false;
        } else {
            delete errorsCopy.treatment;
        }

        if (newItem.price <= 0) {
            errorsCopy.price = "Price must be greater than zero";
            isValid = false;
        } else {
            delete errorsCopy.price;
        }

        setErrors(errorsCopy);
        return isValid;
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="lg" isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Treatment</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex flexDir="column" gap={4}>
                        <Box>
                            <Text>Treatment</Text>
                            <Input
                                value={newItem.treatment}
                                onChange={(e) => setNewItem({ ...newItem, treatment: e.target.value })}
                                placeholder="e.g: Medication"
                                size="md" />
                            {errors.treatment && <Text color="red">{errors.treatment}</Text>}
                        </Box>
                        <Box>
                            <Text>Price</Text>
                            <Flex alignItems="center">
                                <Text marginRight="2" marginLeft="2">IDR</Text>
                                <Input
                                    defaultValue={newItem.price.toString()}
                                    onChange={(e) => {
                                        const cleanedValue = e.target.value.replace(/[^0-9.]/g, '');
                                        setNewItem({ ...newItem, price: parseFloat(cleanedValue) });
                                    }}
                                    placeholder="e.g: 200000"
                                    textAlign="start"
                                    as={CurrencyInput}
                                    allowDecimals={true}
                                    decimalsLimit={2}
                                />
                            </Flex>
                            {errors.price && <Text color="red">{errors.price}</Text>}
                        </Box>
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' onClick={handleSave}>Save</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ModalTreatment;
