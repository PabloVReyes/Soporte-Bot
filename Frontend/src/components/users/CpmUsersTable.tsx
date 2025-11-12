import { Badge, Table, Text } from "@mantine/core"

export const CmpUsersTable = ({ users }: any) => {
    const renderRows = () => {
        if (users.length < 1) {
            return (
                <Table.Tr>
                    <Table.Td colSpan={6} style={{ textAlign: 'center' }}>
                        <Text size="sm" c="dimmed">No hay usuarios registrados</Text>
                    </Table.Td>
                </Table.Tr>
            )
        }

        return users.map((item: any, index: number) => (
            <Table.Tr key={index}>
                <Table.Td>{item.phone}</Table.Td>
                <Table.Td>{item.matricula}</Table.Td>
                <Table.Td>{item.area}</Table.Td>
                <Table.Td>{item.ext}</Table.Td>
                <Table.Td>{item.ip}</Table.Td>
                <Table.Td>
                    <Badge>
                        {item.rol}
                    </Badge>
                </Table.Td>
            </Table.Tr>
        ))
    }

    return (
        <Table.ScrollContainer minWidth={800}>
            <Table verticalSpacing={"xs"}>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Número de contacto</Table.Th>
                        <Table.Th>Matricula</Table.Th>
                        <Table.Th>Área</Table.Th>
                        <Table.Th>Extensión Telefónica</Table.Th>
                        <Table.Th>Dirección IP</Table.Th>
                        <Table.Th>Tipo</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {renderRows()}
                </Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    )
}