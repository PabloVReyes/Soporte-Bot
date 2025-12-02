// import { useSocket } from "@/context/SocketContext"
import { CmpUsersTable } from "@/components/users/CpmUsersTable";
import { useUserStore } from "@/store/userStore";
import { Card, Container, Group, Stack, Text, Title } from "@mantine/core"
import { useEffect } from "react";

export const Users = () => {
    const { users, fetchUsers } = useUserStore();

    useEffect(() => {
        fetchUsers()
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