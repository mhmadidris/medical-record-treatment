"use client"

import { Box, Button, Center, Flex, Image, Text, useToast } from "@chakra-ui/react";

const Home = () => {
  const toast = useToast();

  const handleButtonClick = () => {
    toast({
      status: "success",
      title: "Treatment",
      description: "Success add treatment",
      position: "top-right",
      isClosable: true,
    });
  };

  return (
    <Center h="100vh">
      <Text>Home</Text>
      <Button onClick={handleButtonClick}>asas</Button>
    </Center>
  );
};

export default Home;
