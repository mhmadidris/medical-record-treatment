import { Box, Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { SingleDatepicker } from "chakra-dayzed-datepicker";

interface ModalPatientsProps {
    isOpen: boolean;
    onClose: () => void;
}

const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
];

const ModalPatients: React.FC<ModalPatientsProps> = ({ isOpen, onClose }) => {
    const [newItem, setNewItem] = useState({ treatment: '', price: '' });
    const [date, setDate] = useState(new Date());

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
                            <Input placeholder="e.g: P-1234" size="md" />
                        </Box>
                        <Box>
                            <Text>Patient Name</Text>
                            <Input placeholder="e.g: John Smith" size="md" />
                        </Box>
                        <Box>
                            <Text>Date</Text>
                            <SingleDatepicker
                                name="date-input"
                                date={date}
                                onDateChange={setDate}
                                configs={{
                                    dateFormat: 'EEEE, dd-MM-yyy'
                                }}
                            />
                        </Box>
                        <Box>
                            <Text>Treatment</Text>
                            <Select
                                options={options}
                                isMulti
                                placeholder="Select treatment..."
                            />
                        </Box>
                        <Box>
                            <Text>Medicine</Text>
                            <Select
                                options={options}
                                isMulti
                                placeholder="Select medicine..."
                            />
                        </Box>
                        <Box>
                            <Text>Cost</Text>
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

export default ModalPatients;
