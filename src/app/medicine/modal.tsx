import { Box, Button, Flex, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useNumberInput } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";

interface ModalMedicineProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalMedicine: React.FC<ModalMedicineProps> = ({ isOpen, onClose }) => {
    const [selectedImage, setSelectedImage] = useState<string | ArrayBuffer | null>(null);
    const [selectedFileName, setSelectedFileName] = useState<string>('');
    const [newItem, setNewItem] = useState({ treatment: '', price: '' });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
            setSelectedFileName(file.name);
        }
    };

    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
        step: 1,
        defaultValue: 1,
        min: 1,
    });

    const inc = getIncrementButtonProps();
    const dec = getDecrementButtonProps();
    const input = getInputProps();

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior="inside">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Medicine</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex flexDir="column" gap={4}>
                        <Box>
                            {selectedImage ? (
                                <Box mb={2.5}>
                                    <img src={selectedImage.toString()} alt="Preview" style={{ width: "100%", maxHeight: "200px", borderRadius: "5px", objectFit: "cover" }} />
                                </Box>
                            ) : (
                                <Box mb={2.5}>
                                    <img src="https://source.unsplash.com/random" alt="Default Image" style={{ width: "100%", maxHeight: "200px", borderRadius: "5px", objectFit: "cover" }} />
                                </Box>
                            )}
                            <div style={{ position: 'relative', width: '100%' }}>
                                <Button width="100%" as="label" htmlFor="fileInput" cursor="pointer" size="md" colorScheme="blue">
                                    {selectedFileName || "Choose File"}
                                    <input id="fileInput" type="file" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />
                                </Button>
                            </div>
                        </Box>

                        <Box>
                            <Text>Medicine Name</Text>
                            <Input placeholder="e.g: Paracetamol" size="md" />
                        </Box>

                        <Box>
                            <Text>Stock</Text>
                            <HStack w='100%'>
                                <Button {...dec}>-</Button>
                                <Input {...input} />
                                <Button {...inc}>+</Button>
                            </HStack>
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

export default ModalMedicine;
