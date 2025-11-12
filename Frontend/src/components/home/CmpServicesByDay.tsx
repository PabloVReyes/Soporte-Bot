import { getServicesCountByDay } from "@/api/services";
import { useServiceStore } from "@/store/serviceStore";
import { BarChart } from "@mantine/charts";
import { Card, Text } from "@mantine/core";
import { useEffect, useState } from "react";

export const CmpServicesByDay = () => {
    const [data, setData] = useState<any[]>([]);
    const [series, setSeries] = useState<{ name: string; color: string }[]>([]);

    const { dashboardReload, setDashboardReload } = useServiceStore();

    const loadData = async () => {
        try {
            const raw = await getServicesCountByDay();

            const transformed = raw.map((item: any) => ({
                date: item.date,
                Servicios: item.total,
            }));

            setData(transformed);

            setSeries([{ name: "Servicios", color: "teal.6" }]);
        } catch (error) {
            console.error("Error al cargar servicios por día:", error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (dashboardReload) {
            loadData().then(() => setDashboardReload(false));
        }
    }, [dashboardReload, setDashboardReload]);

    return (
        <Card withBorder shadow="sm" radius="md" p="md">
            <Text fw={500}>Cantidad de servicios por día</Text>

            <BarChart
                mt={25}
                h={300}
                data={data}
                dataKey="date"
                series={series}
                barProps={{ radius: 4 }}
            />
        </Card>
    );
};
