import { database } from "@/database/config"

export const getTechnicalsQuery = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await database.user.findMany({
                where: {
                    rol: {
                        name: "TECHNICAL",
                    },
                },
                include: {
                    ServiceAssigned: {
                        where: {
                            concludedAt: null, // no terminado
                            canceledAt: null,  // no cancelado
                        },
                        select: { id: true },
                    },
                    WorkingHours: {
                        orderBy: {
                            id: 'asc'
                        }
                    }
                },
            });


            resolve(data)
        } catch {
            reject([])
        }
    })
}

export const updateTechnicalQuery = ({ name, workingHours }: { name: string, workingHours: any[] }, id: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const workingHoursCleaned = workingHours
                .filter(w => w.checkIn && w.checkOut) // elimina días vacíos
                .map(w => ({
                    dayOfWeek: w.dayOfWeek,
                    checkInTime: new Date(`1970-01-01T${w.checkIn}:00Z`),
                    departureTime: new Date(`1970-01-01T${w.checkOut}:00Z`),
                }));

            await database.user.update({
                where: {
                    id
                },
                data: {
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