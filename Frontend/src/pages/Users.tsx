// import { useSocket } from "@/context/SocketContext"
import { getUsers } from "@/api/users";
import { CmpUsersTable } from "@/components/users/CpmUsersTable";
import { Card, Container, Group, Stack, Text, Title } from "@mantine/core"
import { useEffect, useState } from "react";

export const Users = () => {
    const [users, setUsers] = useState<any[]>([])

    useEffect(() => {
        getUsers()
            .then(setUsers)
    }, [])
    
    return (
        <Container>
            <Stack gap="md">
                <Group>
                    <Stack gap={1} style={{ flex: '1 1 auto' }}>
                        <Title order={2}>Lista de usuarios</Title>
                        <Text size="sm" c="dimmed">Lista de todos los usuarios registrados</Text>
                    </Stack>
                </Group>

                <Card>
                    <CmpUsersTable
                        users={users}
                    />
                </Card>
            </Stack>
        </Container>
    )
}