import { useModalStore } from "@/store/UIStore"
import { ActionIcon, Badge, Table, Text } from "@mantine/core"
import { IconEdit } from "@tabler/icons-react"
import { CmpUserEdit } from "./CmpUserEdit"

export const CmpUsersTable = ({ users }: any) => {
    const { openModal } = useModalStore()

    const handleEdit = (user: any) => {
        openModal({
            title: "Editar informacion del usuario",
            content: <CmpUserEdit {...user} />
        })
    }

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
                <Table.Td style={{ textAlign: 'center' }}>
                    <ActionIcon className="action" onClick={() => handleEdit(item)}>
                        <IconEdit size={16} stroke={1.5} />
                    </ActionIcon>
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
                        <Table.Th>Rol</Table.Th>
                        <Table.Th style={{ textAlign: 'center' }}>Acciones</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {renderRows()}
                </Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    )
}