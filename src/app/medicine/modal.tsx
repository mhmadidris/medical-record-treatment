import { Box, Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import dayjs from 'dayjs';
import React, { useEffect, useState } from "react";

interface ModalMedicineProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalMedicine: React.FC<ModalMedicineProps> = ({ isOpen, onClose }) => {
    const [currentDate, setCurrentDate] = useState<string>('');

    useEffect(() => {
        setCurrentDate(dayjs().format('YYYY-MM-DD'));
    }, []);

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
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
                            <Text>Date of Treatment</Text>
                            <Input
                                placeholder="Select Date and Time"
                                size="md"
                                type="date"
                                value={currentDate}
                                onChange={(e) => setCurrentDate(e.target.value)}
                            />
                        </Box>
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button variant='ghost'>Save</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ModalMedicine;
