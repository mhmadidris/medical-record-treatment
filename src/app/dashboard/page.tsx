import LayoutPanel from "@/components/Layouts";
import Sidebar from "@/components/Sidebar"
import { Box, Center, Container, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { faPills, faStethoscope, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Dashboard() {
    return (
        <LayoutPanel>
            <Text mb={2.5} fontWeight="bold" fontSize={24}>Dashboard</Text>
            <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(4, 1fr)']} gap={6}>
                <GridItem h="auto" w="auto" bg='white' shadow="md" borderRadius={10} alignItems="center">
                    <Flex justifyContent="start" alignItems="center" p={5} alignSelf="center" h={100}>
                        <FontAwesomeIcon icon={faUserGroup} color="#3fddf2" fontSize="2.5rem" />
                        <Box ms={5}>
                            <Text fontSize={16}>120</Text>
                            <Text fontWeight="bold" fontSize={16}>Patients</Text>
                        </Box>
                    </Flex>
                </GridItem>
                <GridItem h="auto" w="auto" bg='white' shadow="md" borderRadius={10} alignItems="center">
                    <Flex justifyContent="start" alignItems="center" p={5} alignSelf="center" h={100}>
                        <FontAwesomeIcon icon={faPills} color="#FDB0C0" fontSize="2.5rem" />
                        <Box ms={5}>
                            <Text fontSize={16}>65</Text>
                            <Text fontWeight="bold" fontSize={16}>Medicines</Text>
                        </Box>
                    </Flex>
                </GridItem>
                <GridItem h="auto" w="auto" bg='white' shadow="md" borderRadius={10} alignItems="center">
                    <Flex justifyContent="start" alignItems="center" p={5} alignSelf="center" h={100}>
                        <FontAwesomeIcon icon={faStethoscope} color="#B95D8D" fontSize="2.5rem" />
                        <Box ms={5}>
                            <Text fontSize={16}>3</Text>
                            <Text fontWeight="bold" fontSize={16}>Treatments</Text>
                        </Box>
                    </Flex>
                </GridItem>
            </Grid>
        </LayoutPanel>
    );
}
