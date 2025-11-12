import { CmpServicesByDay } from "@/components/home/CmpServicesByDay"
import { CmpServicesByTechnical } from "@/components/home/CmpServicesByTechnical"
import { Container, Group, Stack, Title } from "@mantine/core"

export const Home = () => {
    return (
        <Container>
            <Stack gap="md">
                <Group>
                    <Stack gap={1} style={{ flex: '1 1 auto' }}>
                        <Title order={2}>Inicio</Title>
                    </Stack>
                </Group>

                <CmpServicesByTechnical/>
                <CmpServicesByDay/>
            </Stack>
        </Container>
    )
}