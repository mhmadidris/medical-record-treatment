import { Box, Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import dayjs from 'dayjs';
import React, { useEffect, useState } from "react";

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
    const [currentDate, setCurrentDate] = useState<string>('');
    const [scrollBehavior] = React.useState('inside');

    useEffect(() => {
        setCurrentDate(dayjs().format('YYYY-MM-DD'));
    }, []);

    return (
        <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="lg" isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal Patient</ModalHeader>
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
                            <Input
                                placeholder="Select Date and Time"
                                size="md"
                                type="date"
                                value={currentDate}
                                onChange={(e) => setCurrentDate(e.target.value)}
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
