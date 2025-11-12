import { database } from "../../database/config";

export const getTechnicalsNotAssignedQuery = async (excludeTechnicalId?: number) => {
    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    const daysOfWeek = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
    const currentDay = daysOfWeek[now.getDay()];

    const whereClause: any = {
        rol: { name: 'TECHNICAL' },
        ServiceAssigned: {
            none: {
                assignedAt: { not: null },
                concludedAt: null,
                canceledAt: null,
                pausedAt: null
            }
        }
    };

    if (excludeTechnicalId) {
        whereClause.id = { not: excludeTechnicalId };
    }

    const Technicians = await database.user.findMany({
        where: whereClause,
        include: {
            WorkingHours: true // Include working hours for filtering
        }
    })

    const availableTechnicians = Technicians.filter((t: any) => {
        const todayWorkingHours = t.WorkingHours.find((wh: any) => wh.dayOfWeek === currentDay);

        if (!todayWorkingHours) {
            return false; // No working hours defined for today
        }

        const checkInMinutes = todayWorkingHours.checkInTime.getUTCHours() * 60 + todayWorkingHours.checkInTime.getUTCMinutes();
        const departureMinutes = todayWorkingHours.departureTime.getUTCHours() * 60 + todayWorkingHours.departureTime.getUTCMinutes();

        return nowMinutes >= checkInMinutes && nowMinutes <= departureMinutes;
    });

    console.log(availableTechnicians)
    return availableTechnicians
}

export const getIsTechnicalNotAssigned = async (phone: string) => {
    try {
        // Buscar si el técnico tiene servicios sin concluir
        const activeService = await database.service.findFirst({
            where: {
                technicalId: phone,
                concludedAt: null,
                canceledAt: null,
                pausedAt: null
            },
        });

        console.log(activeService)

        // Si tiene un servicio activo → no está libre
        return !activeService;
    } catch (error: any) {
        console.error("Error al verificar si el técnico está libre:", error);
        return false;
    }
}