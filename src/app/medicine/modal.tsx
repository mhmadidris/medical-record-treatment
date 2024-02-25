import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import {
    Box,
    Button,
    Flex,
    HStack,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useNumberInput,
    CircularProgress
} from "@chakra-ui/react";
import { createMedicine } from "@/controllers/medicineController";
import { Medicine } from "@/models/Medicine";

interface ModalMedicineProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalMedicine: React.FC<ModalMedicineProps> = ({ isOpen, onClose }) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [selectedFileName, setSelectedFileName] = useState<string>('');
    const [newItem, setNewItem] = useState<Medicine>({ image: '', title: '', stock: 0, price: 0 });
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setSelectedFileName(file.name);
        }
    };

    const handleSave = async () => {
        setIsLoading(true);
        try {
            await createMedicine(newItem, selectedImage);
            setNewItem({ image: '', title: '', stock: 0, price: 0 });
            setSelectedImage(null);
            onClose();
        } catch (error) {
            console.error("Error saving medicine:", error);
        } finally {
            setIsLoading(false);
        }
    }

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
                            <img src={selectedImage ? URL.createObjectURL(selectedImage) : "/assets/images/default-image.png"} alt="Preview" style={{ width: "100%", maxHeight: "200px", borderRadius: "5px", objectFit: "cover" }} />
                            <div style={{ position: 'relative', width: '100%', marginTop: "1rem" }}>
                                <Button width="100%" as="label" htmlFor="fileInput" cursor="pointer" size="md" colorScheme="blue">
                                    {selectedFileName || "Choose File"}
                                    <input id="fileInput" type="file" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />
                                </Button>
                            </div>
                        </Box>

                        <Box>
                            <Text>Medicine Name</Text>
                            <Input placeholder="e.g: Paracetamol" size="md" onChange={(e) => setNewItem({ ...newItem, title: e.target.value })} />
                        </Box>

                        <Box>
                            <Text>Stock</Text>
                            <HStack w='100%'>
                                <Button {...dec}>-</Button>
                                <Input {...input} onChange={(e) => setNewItem({ ...newItem, stock: parseInt(e.target.value) })} />
                                <Button {...inc}>+</Button>
                            </HStack>
                        </Box>

                        <Box>
                            <Text>Price</Text>
                            <Flex alignItems="center">
                                <Text marginRight="2" marginLeft="2">IDR</Text>
                                <Input
                                    defaultValue={newItem.price}
                                    onChange={(e) => {
                                        const cleanedValue = e.target.value.replace(/[^0-9.]/g, '');
                                        setNewItem({ ...newItem, price: parseInt(cleanedValue) });
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

export default ModalMedicine;
