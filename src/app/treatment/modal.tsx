import { Box, Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { createTreatment } from "../../controllers/treatmentController";
import { Treatment } from "../../models/Treatment";

interface ModalTreatmentProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalTreatment: React.FC<ModalTreatmentProps> = ({ isOpen, onClose }) => {
    const [newItem, setNewItem] = useState<Treatment>({ treatment: '', price: 0 });

    const handleSave = async () => {
        try {
            await createTreatment(newItem);
            setNewItem({ treatment: '', price: 0 });
            onClose();
        } catch (error) {
            console.error("Error saving treatment:", error);
        }
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
                        </Box>
                        <Box>
                            <Text>Price</Text>
                            <Flex alignItems="center">
                                <Text marginRight="2" marginLeft="2">IDR</Text>
                                <Input
                                    defaultValue={newItem.price.toString()}
                                    onChange={(e) => {
                                        const cleanedValue = e.target.value.replace(/[^0-9.]/g, '');
                                        setNewItem({ ...newItem, price: parseInt(cleanedValue) });
                                    }}
                                    placeholder="e.g: 200000"
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
                    <Button colorScheme='blue' onClick={handleSave}>Save</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ModalTreatment;
