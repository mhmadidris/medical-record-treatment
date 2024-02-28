"use client"

import { Box, Button, Center, Flex, Image, Text } from "@chakra-ui/react";
import Link from "next/link";

const Home = () => {
  return (
    <Box>
      <Box bg="blue.500" color="white" py="2" px="6">
        <Flex justify="space-between" align="center">
          <Text fontSize="2xl">Medical</Text>
        </Flex>
      </Box>

      <Center h="calc(100vh - 100px)">
        <Box textAlign="center">
          <Text fontSize="4xl" mb="4">Welcome to Medical Record Treatment</Text>
          <Link href="/dashboard">
            <Button colorScheme="blue" size="lg">
              Dashboard
            </Button>
          </Link>
        </Box>
      </Center>

      <Box bg="gray.200" py="3" px="6">
        <Text fontSize="sm" color="gray.600">&copy; {new Date().getFullYear()} Medical Record Treatment. All rights reserved.</Text>
      </Box>
    </Box>
  );
};

export default Home;
