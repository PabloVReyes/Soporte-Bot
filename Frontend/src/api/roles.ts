import { api } from "@/services/axios"

export const getRoles = async(): Promise<string[]> => {
    const response = await api.get("/api/roles")
    return response.data
}