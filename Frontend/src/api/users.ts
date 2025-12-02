import { api } from "@/services/axios";

export const getUsers = async () => {
    const response = await api.get('/api/users')
    return response.data
}

export const updateUser = async(id: string, values: any): Promise<string[]> => {
    const response = await api.put(`/api/users/${id}`, values)
    return response.data
}

export const getTechnicals = async () => {
    const response = await api.get('/api/users/technicals')
    return response.data
}

export const getTechnicalsSupportManager = async () => {
    const response = await api.get('/api/users/technicals/manager')
    return response.data
}

