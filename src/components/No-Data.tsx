import { Box, Center, Flex, Image, Text } from "@chakra-ui/react"

const NoData = () => {
    return (
        <Center h="100vh">
            <Flex flexDir="column" justifyContent="center" alignContent="center" alignItems="center">
                <Image src="/assets/images/empty.png" w={28} h={28} />
                <Text mt={5} fontSize={24} fontWeight="bold">SORRY!</Text>
                <Text fontSize={18} fontWeight="normal">No data found</Text>
            </Flex>
        </Center>
    );
};

export default NoData;