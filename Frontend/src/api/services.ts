import { api } from "@/services/axios"

export const getServices = async (page?: number, limit?: number): Promise<string[]> => {
    const response = await api.get(`/api/services?page=${page}&limit=${limit}`)
    return response.data
}

export const getCountServices = async(): Promise<number> => {
    const response = await api.get(`/api/services/count`)
    return response.data
}

export const getServicesCountByTechAndDay = async(): Promise<string[]> => {
    const response = await api.get("/api/services/count/technical")
    return response.data
}

export const getServicesCountByDay = async(): Promise<string[]> => {
    const response = await api.get("/api/services/count/day")
    return response.data
}