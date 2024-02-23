import LayoutPanel from "@/components/Layouts";
import Sidebar from "@/components/Sidebar"
import { Center, Container, Flex, Grid, GridItem, Text } from "@chakra-ui/react";

export default function Dashboard() {
    return (
        <LayoutPanel>
            <Container marginX={250} w="100%">
                <Grid templateColumns='repeat(4, 1fr)' gap={6}>
                    <GridItem h={100} bg='blue.500'>
                        <Center>
                            <Text>
                                Aasas
                            </Text>
                        </Center>
                    </GridItem>
                </Grid>
            </Container>
        </LayoutPanel>
    );
}
