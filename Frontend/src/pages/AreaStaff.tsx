import { CmpTechnicalsTable } from "@/components/technicals/CmpTechnicalsTable"
import { useUserStore } from "@/store/userStore"
import { Card, Container, Group, Stack, Text, Title } from "@mantine/core"
import { useEffect } from "react"

export const AreaStaff = () => {
    const { technicals, fetchTechnicals, fetchTechnicalsSupportManager, technicalsSupportManager } = useUserStore();

    useEffect(() => {
        fetchTechnicals()
        fetchTechnicalsSupportManager()
    }, []);

    return (
        <Container>
            <Stack gap="md">
                <Group>
                    <Stack gap={1} style={{ flex: '1 1 auto' }}>
                        <Title order={2}>Encargado del área de soporte tecnico</Title>
                    </Stack>
                </Group>

                <Card>
                    <CmpTechnicalsTable
                        technicals={technicalsSupportManager}
                    />
                </Card>

                <Group>
                    <Stack gap={1} style={{ flex: '1 1 auto' }}>
                        <Title order={2}>Lista de tecnicos</Title>
                        <Text size="sm" c="dimmed">Lista de todos los tecnicos registrados</Text>
                    </Stack>
                </Group>

                <Card>
                    <CmpTechnicalsTable
                        technicals={technicals}
                    />
                </Card>
            </Stack>
        </Container>
    )
}