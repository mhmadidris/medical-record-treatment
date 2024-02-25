import { Button, Wrap, WrapItem, useToast, ToastPosition } from "@chakra-ui/react";

interface ToastDisplayProps {
    toatsStatus?: "success" | "info" | "warning" | "error" | "loading";
    title?: string;
    toastPosition?: ToastPosition;
    isClosable?: boolean;
    message?: string;
}

function ToastDisplay({ toatsStatus, title, toastPosition, isClosable, message }: ToastDisplayProps) {
    const toast = useToast();

    toast({
        status: toatsStatus,
        title: title,
        position: toastPosition,
        isClosable: isClosable,
    });

    return (
        <Wrap>
            <WrapItem>
                {message}
            </WrapItem>
        </Wrap>
    );
}

export default ToastDisplay;
