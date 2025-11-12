import { useEffect, useState } from "react";
import { getServices, getCountServices } from "@/api/services";
import { Container, Stack, Group, Title, Text, Grid, Card } from "@mantine/core";
import { Pagination } from "@/components/Pagination";
import { CmpService } from "@/components/services/CmpService";
import { useServiceStore } from "@/store/serviceStore";

export const Services = () => {
    const [services, setServices] = useState<any[]>([]);
    const {
        shouldReload,
        setShouldReload,
        setTotalItems,
        page,
        limit,
        search,
    } = useServiceStore();

    const loadData = async () => {
        const data = await getServices(page, limit);
        setServices(data);

        const count = await getCountServices();
        setTotalItems(count);
    };

    useEffect(() => {
        loadData();
    }, [page, limit, search]);

    useEffect(() => {
        if (shouldReload) {
            loadData().then(() => setShouldReload(false));
        }
    }, [shouldReload, setShouldReload]);

    return (
        <Container>
            <Stack gap="md">
                <Group>
                    <Stack gap={1} style={{ flex: "1 1 auto" }}>
                        <Title order={2}>Lista de servicios</Title>
                        <Text size="sm" c="dimmed">
                            Lista de todos los servicios solicitados
                        </Text>
                    </Stack>
                </Group>

                <Grid columns={12} align="start">
                    {services.map((item) => (
                        <Grid.Col span={{ base: 12, md: 6, lg: 4 }} key={item.id}>
                            <CmpService {...item} />
                        </Grid.Col>
                    ))}
                </Grid>

                <Card>
                    <Pagination useStore={useServiceStore} />
                </Card>
            </Stack>
        </Container>
    );
};
