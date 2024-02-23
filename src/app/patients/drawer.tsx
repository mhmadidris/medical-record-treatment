import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Input, DrawerFooter, Button } from "@chakra-ui/react";
import { useRef } from "react";

interface DrawerPatientsProps {
    isOpen: boolean;
    onClose: () => void;
}

const DrawerPatients: React.FC<DrawerPatientsProps> = ({ isOpen, onClose }) => {
    const btnRef = useRef<HTMLButtonElement>(null);

    return (
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            finalFocusRef={btnRef}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Detail Patient</DrawerHeader>
                <DrawerBody>
                    <Input placeholder='Type here...' />
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
}

export default DrawerPatients;
