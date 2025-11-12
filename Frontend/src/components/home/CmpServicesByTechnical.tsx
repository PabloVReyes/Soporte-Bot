import { getServicesCountByTechAndDay } from "@/api/services";
import { useServiceStore } from "@/store/serviceStore";
import { AreaChart } from "@mantine/charts";
import { Card, Text } from "@mantine/core";
import { useEffect, useState } from "react";

export const CmpServicesByTechnical = () => {
    const [data, setData] = useState<any[]>([]);
    const [series, setSeries] = useState<{ name: string; color: string }[]>([]);

    const {
        dashboardReload,
        setDashboardReload,
    } = useServiceStore();

    const loadData = async () => {
        getServicesCountByTechAndDay().then((raw) => {
            const grouped: Record<string, any> = {};
            const uniqueNames = new Set<string>();

            raw.forEach((item: any) => {
                const date = item.date;
                if (!grouped[date]) grouped[date] = { date };
                grouped[date][item.name] = item.total;
                uniqueNames.add(item.name);
            });

            const transformed = Object.values(grouped);
            setData(transformed);

            const palette = [
                "indigo.6",
                "blue.6",
                "teal.6",
                "cyan.6",
                "orange.6",
                "pink.6",
                "grape.6",
            ];
            setSeries(
                Array.from(uniqueNames).map((name, i) => ({
                    name,
                    color: palette[i % palette.length],
                }))
            );
        });
    }

    useEffect(() => {
        loadData()
    }, []);

    useEffect(() => {
        if (dashboardReload) {
            loadData().then(() => setDashboardReload(false));
        }
    }, [dashboardReload, setDashboardReload]);

    return (
        <Card withBorder shadow="sm" radius="md" p="md">
            <Text>Cantidad de servicios por tecnico</Text>
            <AreaChart
                mt={25}
                h={300}
                data={data}
                dataKey="date"
                series={series}
                curveType="linear"
                strokeWidth={2}
            />
        </Card>
    );
};
