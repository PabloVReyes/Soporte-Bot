import { getTechnicals } from "@/api/technicals"
import { CmpTechnicalsTable } from "@/components/technicals/CmpTechnicalsTable"
import { useServiceStore } from "@/store/serviceStore"
import { Card, Container, Group, Stack, Text, Title } from "@mantine/core"
import { useEffect, useState } from "react"

export const Technicals = () => {
    const [technicals, setTechnicals] = useState<any[]>([])

    const {
        shouldReload,
        setShouldReload,
    } = useServiceStore();

    const loadData = async () => {
        const data = await getTechnicals();
        setTechnicals(data);
    };

    useEffect(() => {
        if (shouldReload) {
            loadData().then(() => setShouldReload(false));
        }
    }, [shouldReload, setShouldReload]);

    useEffect(() => {
        loadData()
    }, [])

    return (
        <Container>
            <Stack gap="md">
                <Group>
                    <Stack gap={1} style={{ flex: '1 1 auto' }}>
                        <Title order={2}>Lista de tecnicos</Title>
                        <Text size="sm" c="dimmed">Lista de todos los tecnicos registrados</Text>
                    </Stack>
                </Group>

                <Card>
                    <CmpTechnicalsTable
                        onUpdate={loadData}
                        technicals={technicals}
                    />
                </Card>
            </Stack>
        </Container>
    )
}