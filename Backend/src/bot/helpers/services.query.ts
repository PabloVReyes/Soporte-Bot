import { database } from "../../database/config"

interface Props {
    phone: string;
    description: string;
}
export const saveServiceQuery = async ({ description, phone }: Props) => {
    try {
        const service = await database.service.create({
            data: {
                user: {
                    connect: { id: phone }
                },
                description
            },
            include: {
                user: true
            }
        })

        return service
    } catch (error) {
        console.error("Error en saveServiceQuery", error)
        throw new Error("Error al crear servicio")
    }
}

export const updateServiceQuery = async (id: number, data: Record<string, any>) => {
    try {
        const service = await database.service.update({
            where: { id },
            data
        })

        return service
    } catch (error) {
        console.error("Error en updateServiceQuery", error)
        throw new Error("Error al actualizar el servicio")
    }
}

export const getServicesNotAssigned = async () => {
    try {
        const service = await database.service.findFirst({
            where: {
                canceledAt: null,
                assignedAt: null
            },
            include: {
                user: true
            },
            orderBy: {
                createdAt: 'asc'
            }
        })

        return service
    } catch (error) {
        console.error("Error en getServicesNotAssigned", error)
        throw new Error("Error al obtener servicios no asignados")
    }
}

export const getServiceAssigned = async (phone: string) => {
    try {
        const service = await database.service.findFirst({
            where: {
                technical: {
                    id: phone
                },
                canceledAt: null,
                concludedAt: null,
                pausedAt: null
            },
            include: {
                user: true,
                technical: {
                    include: {
                        WorkingHours: true
                    }
                },
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return service
    } catch (error) {
        console.error("Error en getServiceAssigned", error)
        throw new Error("Error al obtener servicio asignado")
    }
}

export const getServiceCanceledQuery = async (phone: string) => {
    try {
        const service = await database.service.findFirst({
            where: {
                user: {
                    id: phone
                },
                concludedAt: null,
                canceledAt: null
            },
            include: {
                user: true,
                technical: true,
            },
            orderBy: {
                id: "desc"
            }
        })

        return service
    } catch {
        console.error("Error en getServiceCanceledQuery")
        throw new Error("Error al obtener servicio cancelado")
    }
}

export const getLastPausedServiceQuery = async (phone: string) => {
    try {
        const service = await database.service.findFirst({
            where: {
                user: {
                    id: phone
                },
                pausedAt: { not: null },
            },
            include: {
                technical: true,
                user: true,
            },
            orderBy: {
                id: "desc"
            }
        })

        return service
    } catch (error) {
        console.error("Error en getUserLastPausedServiceQuery", error)
        throw new Error("Error al obtener servicio pausado")
    }
}

export const getPausedServiceQuery = async (phone: string) => {
    try {
        const service = await database.service.findFirst({
            where: {
                user: {
                    id: phone
                },
                assignedAt: { not: null },
                concludedAt: null,
                pausedAt: { not: null }
            },
            include: {
                technical: true,
                user: true
            },
            orderBy: {
                id: "desc"
            }
        })

        return service
    } catch (error) {
        console.error("Error en getPausedServiceQuery", error)
        throw new Error("Error al obtener servicio pausado")
    }
}