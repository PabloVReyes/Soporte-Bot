import { useModalStore } from "@/store/UIStore";
import { ActionIcon, Badge, Table, Text } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { CmpUserEdit } from "../users/CmpUserEdit";

export const CmpTechnicalsTable = ({ technicals }: any) => {
    const { openModal } = useModalStore();

    const handleEdit = (technical: any) => {
        openModal({
            title: "Editar información técnico",
            content: <CmpUserEdit {...technical} />,
        });
    };

    const formatTimeAMPM = (dateString?: string) => {
        if (!dateString) return "--:--";

        // Extraemos solo la parte HH:MM
        const match = dateString.match(/T(\d{2}):(\d{2}):\d{2}/);
        if (!match) return "--:--";

        let hours = parseInt(match[1], 10);
        const minutes = match[2];

        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12; // Convertir 0 -> 12, 13->1, etc.

        return `${hours.toString().padStart(2, "0")}:${minutes} ${ampm}`;
    };


    const formatWorkingHours = (workingHours: any[]) => {
        if (!workingHours || workingHours.length === 0)
            return <Text size={"sm"} c="dimmed">Sin horarios</Text>;

        const daysMap: Record<string, string> = {
            MONDAY: "Lun",
            TUESDAY: "Mar",
            WEDNESDAY: "Mié",
            THURSDAY: "Jue",
            FRIDAY: "Vie",
            SATURDAY: "Sáb",
            SUNDAY: "Dom",
        };

        return (
            <div style={{ lineHeight: 1.4 }}>
                {workingHours.map((wh, i) => (
                    <Text key={i} size="xs">
                        <strong>{daysMap[wh.dayOfWeek] ?? wh.dayOfWeek}:</strong>{" "}
                        {formatTimeAMPM(wh.checkInTime)} - {formatTimeAMPM(wh.departureTime)}
                    </Text>
                ))}
            </div>
        );
    };

    const renderRows = () => {
        if (technicals.length < 1) {
            return (
                <Table.Tr>
                    <Table.Td colSpan={6} style={{ textAlign: 'center' }}>
                        <Text size="sm" c="dimmed">No hay tecnicos registrados</Text>
                    </Table.Td>
                </Table.Tr>
            )
        }

        return technicals.map((item: any, index: number) => (
            <Table.Tr key={index}>
                <Table.Td>{item.phone}</Table.Td>
                <Table.Td>{item.name}</Table.Td>
                <Table.Td>
                    <Badge color={item.status === "available" ? "green" : "red"}>
                        {item.status === "available" ? "Disponible" : "En servicio"}
                    </Badge>
                </Table.Td>
                <Table.Td>{formatWorkingHours(item.WorkingHours)}</Table.Td>
                <Table.Td style={{ textAlign: 'center' }}>
                    <ActionIcon className="action" onClick={() => handleEdit(item)}>
                        <IconEdit size={16} stroke={1.5} />
                    </ActionIcon>
                </Table.Td>
            </Table.Tr>
        ));
    };

    return (
        <Table.ScrollContainer minWidth={800}>
            <Table verticalSpacing={"xs"}>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Número de contacto</Table.Th>
                        <Table.Th>Nombre</Table.Th>
                        <Table.Th>Estado</Table.Th>
                        <Table.Th>Horarios</Table.Th>
                        <Table.Th style={{ textAlign: 'center' }}>Acciones</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{renderRows()}</Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    );
};
