import { Box, Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import dayjs from 'dayjs';
import React, { ChangeEvent, useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { collection, addDoc } from "firebase/firestore"
import { db } from "../firebase"

interface ModalTreatmentProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalTreatment: React.FC<ModalTreatmentProps> = ({ isOpen, onClose }) => {
    const [currentDate, setCurrentDate] = useState<string>('');

    useEffect(() => {
        setCurrentDate(dayjs().format('YYYY-MM-DD'));
    }, []);

    const digitOrDot = /([0-9]|\.)/;
    const [value, setValue] = useState<string | null>(null);
    const [mask, setMask] = useState([digitOrDot]);

    // Add Item
    const addItem = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (newItem.treatment !== '' && newItem.price !== '') {
            await addDoc(collection(db, 'treatments'), {
                treatment: newItem.treatment.trim(),
                price: newItem.price,
            });
            setNewItem({ treatment: "", price: "" });
        }
    }

    const [newItem, setNewItem] = useState({ treatment: '', price: '' });

    return (
        <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="lg" isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal Treatment</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex flexDir="column" gap={4}>
                        <Box>
                            <Text>Treatment</Text>
                            <Input
                                value={newItem.treatment}
                                onChange={(e) => setNewItem({ ...newItem, treatment: e.target.value })}
                                placeholder="e.g: John Smith"
                                size="md" />
                        </Box>
                        <Box>
                            <Text>Price</Text>
                            <Flex alignItems="center">
                                <Text marginRight="2" marginLeft="2">IDR</Text>
                                <Input
                                    defaultValue={newItem.price}
                                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                                    placeholder="Price..."
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
                    <Button onClick={addItem} colorScheme='blue'>Save</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ModalTreatment;
function setItems(arg0: any[]) {
    throw new Error("Function not implemented.");
}

