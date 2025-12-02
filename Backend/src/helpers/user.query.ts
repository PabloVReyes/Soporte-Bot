import { database } from "../database/config"

export const getUsersQuery = async (whereClause: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const baseUserQuery = {
                include: {
                    rol: true,
                    ServiceAssigned: {
                        where: {
                            concludedAt: null,
                            canceledAt: null,
                        },
                        select: { id: true },
                    },
                    WorkingHours: {
                        orderBy: {
                            id: "asc",
                        },
                    },
                },
            } as const;

            const data = await database.user.findMany({
                where: whereClause,
                ...baseUserQuery,
            })

            resolve(data)
        } catch (error: any) {
            console.log("Error en getUserQuery", error)
            reject([])
        }
    })
}

export const putUserQuery = ({ name, workingHours, rol }: { name: string, workingHours: any[], rol: string }, id: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const workingHoursCleaned = workingHours
                .filter(w => w.checkIn && w.checkOut) // elimina días vacíos
                .map(w => ({
                    dayOfWeek: w.dayOfWeek,
                    checkInTime: new Date(`1970-01-01T${w.checkIn}:00Z`),
                    departureTime: new Date(`1970-01-01T${w.checkOut}:00Z`),
                }));

            console.log(workingHoursCleaned)

            await database.user.update({
                where: {
                    id
                },
                data: {
                    rolId: rol,
                    name,
                    WorkingHours: {
                        deleteMany: {}, // elimina los horarios anteriores
                        create: workingHoursCleaned
                    },
                },
                include: { WorkingHours: true },
            })
            resolve(true)
        } catch (error: any) {
            console.error(error.message)
            reject(false)
        }
    })
}