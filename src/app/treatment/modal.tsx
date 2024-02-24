import { Box, Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";

interface ModalTreatmentProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalTreatment: React.FC<ModalTreatmentProps> = ({ isOpen, onClose }) => {
    const digitOrDot = /([0-9]|\.)/;

    const [newItem, setNewItem] = useState({ treatment: '', price: '' });

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
                                    defaultValue={newItem.price}
                                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
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
                    <Button colorScheme='blue'>Save</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ModalTreatment;
function setItems(arg0: any[]) {
    throw new Error("Function not implemented.");
}

