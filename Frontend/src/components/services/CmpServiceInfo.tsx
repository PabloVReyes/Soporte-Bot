import { formatDate } from "@/utils/formatDate";
import { formatStatus } from "@/utils/formatStatus";
import { Badge, Table } from "@mantine/core"

interface Technical {
    name?: string
}

interface User {
    matricula?: string;
    area?: string;
    ext?: string;
    ip?: string;
}

interface Props {
    id: number;
    status: string;
    description: string;
    user?: User
    createdAt: string;
    concludedAt?: string;
    technical?: Technical;
    assignedAt: string;
}

export const CmpServiceInfo = ({ id, status, description, createdAt, user, technical, concludedAt, assignedAt }: Props) => {
    return (
        <Table.ScrollContainer minWidth={300}>
            <Table variant="vertical" layout="fixed" withTableBorder>
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Th colSpan={2} style={{ textAlign: 'center' }}>
                            Servicio
                        </Table.Th>
                    </Table.Tr>

                    <Table.Tr>
                        <Table.Th w={160}>Número de servicio</Table.Th>
                        <Table.Td>{id}</Table.Td>
                    </Table.Tr>

                    <Table.Tr>
                        <Table.Th>Estado</Table.Th>
                        <Table.Td>
                            <Badge color={formatStatus(status)?.color}>{formatStatus(status)?.status}</Badge>
                        </Table.Td>
                    </Table.Tr>

                    <Table.Tr>
                        <Table.Th>Fecha de creación</Table.Th>
                        <Table.Td>
                            {formatDate(createdAt)}
                        </Table.Td>
                    </Table.Tr>

                    <Table.Tr>
                        <Table.Th>Servicio</Table.Th>
                        <Table.Td>
                            {description}
                        </Table.Td>
                    </Table.Tr>

                    {concludedAt &&
                        <Table.Tr>
                            <Table.Th>Fecha de conclusión</Table.Th>
                            <Table.Td>
                                {formatDate(concludedAt)}
                            </Table.Td>
                        </Table.Tr>
                    }

                    <Table.Tr>
                        <Table.Th colSpan={2} style={{ textAlign: 'center' }}>
                            Usuario
                        </Table.Th>
                    </Table.Tr>

                    <Table.Tr>
                        <Table.Th>Matricula</Table.Th>
                        <Table.Td>
                            {user?.matricula}
                        </Table.Td>
                    </Table.Tr>

                    <Table.Tr>
                        <Table.Th>Área</Table.Th>
                        <Table.Td>
                            {user?.area}
                        </Table.Td>
                    </Table.Tr>

                    <Table.Tr>
                        <Table.Th>Extensión Telefónica</Table.Th>
                        <Table.Td>
                            {user?.ext}
                        </Table.Td>
                    </Table.Tr>

                    <Table.Tr>
                        <Table.Th>Dirección IP</Table.Th>
                        <Table.Td>
                            {user?.ip}
                        </Table.Td>
                    </Table.Tr>

                    <Table.Tr>
                        <Table.Th colSpan={2} style={{ textAlign: 'center' }}>
                            Técnico
                        </Table.Th>
                    </Table.Tr>

                    {!technical ?
                        <Table.Tr>
                            <Table.Td colSpan={2} style={{ textAlign: 'center' }}>
                                Sin asignar
                            </Table.Td>
                        </Table.Tr>
                        :
                        <>
                            <Table.Tr>
                                <Table.Th>Nombre</Table.Th>
                                <Table.Td>
                                    {technical.name}
                                </Table.Td>
                            </Table.Tr>

                            <Table.Tr>
                                <Table.Th>Fecha de asignación</Table.Th>
                                <Table.Td>
                                    {formatDate(assignedAt)}
                                </Table.Td>
                            </Table.Tr>
                        </>
                    }

                </Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    )
}