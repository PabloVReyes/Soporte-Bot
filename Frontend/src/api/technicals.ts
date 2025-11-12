import { api } from "@/services/axios"

export const getTechnicals = async(): Promise<string[]> => {
    const response = await api.get("/api/technicals")
    return response.data
}

export const updateTechnical = async(id: string, values: any): Promise<string[]> => {
    const response = await api.put(`/api/technicals/${id}`, values)
    return response.data
}