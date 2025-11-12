import { api } from "@/services/axios";

export const getUsers = async () => {
    const response = await api.get('/api/users')
    return response.data
}