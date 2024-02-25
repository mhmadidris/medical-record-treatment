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
    CircularProgress,
    useToast
} from "@chakra-ui/react";
import { createMedicine } from "@/controllers/medicineController";
import { Medicine } from "@/models/Medicine";

interface ModalMedicineProps {
    isOpen: boolean;
    onClose: () => void;
    refreshData: () => void;
}

const ModalMedicine: React.FC<ModalMedicineProps> = ({ isOpen, onClose, refreshData }) => {
    const toast = useToast();
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [selectedFileName, setSelectedFileName] = useState<string>('');
    const [newItem, setNewItem] = useState<Medicine>({ image: '', title: '', stock: 0, price: 0 });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
            if (validateForm()) {
                await createMedicine({
                    ...newItem,
                    stock: parseInt(input.value)
                }, selectedImage);
                setNewItem({ image: '', title: '', stock: 0, price: 0 });
                setSelectedImage(null);
                onClose();

                toast({
                    status: "success",
                    title: "Medicine",
                    description: "Success add medicine",
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
                title: "Medicine",
                description: "failed add medicine",
                position: "top-right",
                isClosable: true,
            });

            console.error("Error saving medicine:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
        step: 1,
        defaultValue: 1,
        min: 1,
        inputMode: "decimal"
    });

    const inc = getIncrementButtonProps();
    const dec = getDecrementButtonProps();
    const input = getInputProps();

    const validateForm = () => {
        let isValid = true;
        const errorsCopy = { ...errors };

        if (!selectedFileName) {
            errorsCopy.image = "Image is required";
            isValid = false;
        } else {
            delete errorsCopy.image;
        }

        if (!newItem.title.trim()) {
            errorsCopy.title = "Medicine Name is required";
            isValid = false;
        } else {
            delete errorsCopy.title;
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
                        {errors.image && <Text color="red">{errors.image}</Text>}

                        <Box>
                            <Text>Medicine Name</Text>
                            <Input placeholder="e.g: Paracetamol" size="md" onChange={(e) => setNewItem({ ...newItem, title: e.target.value })} />
                            {errors.title && <Text color="red">{errors.title}</Text>}
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
                            {errors.price && <Text color="red">{errors.price}</Text>}
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
