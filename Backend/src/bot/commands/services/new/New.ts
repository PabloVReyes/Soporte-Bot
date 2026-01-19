import { SendMessageProps } from "../../types";
import { getTechnicalServicesCountToday, getTechnicalsNotAssignedQuery } from "@/bot/helpers/technicals.query";
import { startServiceReminder } from "./utils";
import { Messages } from "../../../messages";
import { io } from "@/socket";
import { updateUserDataQuery } from "@/bot/helpers/users.query";
import { saveServiceQuery, updateServiceQuery } from "@/bot/helpers/services.query";

export const New = async ({ message, phone, sock }: SendMessageProps) => {
    if (message.length < 10) {
        return Messages.service.new.error.length
    }

    await updateUserDataQuery(phone, { conversationStep: null })

    const service = await saveServiceQuery({
        description: message,
        phone
    })

    io.emit("updateData", { entity: "service", action: "create" });

    // Obtener tecnicos disponibles
    const technicals = await getTechnicalsNotAssignedQuery()
    console.log(technicals)

    if (technicals.length <= 0) {
        return Messages.service.new.error.technical
    }

    // Elegir tecnico con MENOS servicios hoy
    // Obtener conteo de servicios por tecnico
    const technicalsWithCount = await Promise.all(
        technicals.map(async tech => {
            const count = await getTechnicalServicesCountToday(tech.id)
            return {
                ...tech,
                servicesToday: count
            }
        })
    )

    // Ordenar por menor cantidad de servicios
    technicalsWithCount.sort((a, b) => a.servicesToday - b.servicesToday)

    // Tomar el que tenga menos
    const technical: any = technicalsWithCount[0]

    // Asignar servicio al tecnico
    await updateServiceQuery(service.id, { technicalId: technical.id, assignedAt: new Date() })

    // Crear recordatorio para el tecnico donde su servicio no ha concluido
    startServiceReminder(service.id, technical.id, sock);


    io.emit("updateData", { entity: "service", action: "assigned" });

    if (phone === technical.id) {
        return Messages.service.new.success.technical
    }

    await sock.sendMessage(technical.id, {
        text: Messages.service.new.success.assigned(service, service.user)
    })

    return Messages.service.new.success.user(technical.name)
}