import { useModalStore } from "@/store/UIStore";
import { formatDate } from "@/utils/formatDate";
import { formatStatus } from "@/utils/formatStatus";
import { Avatar, Badge, Card, Group, Text } from "@mantine/core"
import { CmpServiceInfo } from "./CmpServiceInfo";

interface Props {
    id: number
    description: string;
    createdAt: string;
    concludedAt: string;
    status: string;
    assignedAt: string;
}

export const CmpService = (service: Props) => {
    const { openModal } = useModalStore()

    const handleInfoService = () => {
        openModal({
            title: "Información",
            content: <CmpServiceInfo {...service} />
        })
    }

    return (
        <Card onDoubleClick={handleInfoService}>
            <Card.Section className="section">
                <Group justify="space-between">
                    <Text size="sm" c="dimmed">Creado {formatDate(service.createdAt)}</Text>
                    <Badge color={formatStatus(service.status)?.color}>{formatStatus(service.status)?.status}</Badge>
                </Group>
            </Card.Section>
            <Card.Section
                className="section"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    height: '100%',
                    minHeight: '200px',
                    gap: '8px',
                }}
            >
                <Avatar variant="filled" radius="sm">
                    {service.id}
                </Avatar>
                <Text lineClamp={3}>
                    {service.description}
                </Text>
            </Card.Section>
            <Card.Section className="section">
                <Text size="sm" c="dimmed">{service.concludedAt ? `Concluido ${formatDate(service.concludedAt)}` : "Sin concluir"}</Text>
            </Card.Section>
        </Card>
    )
}