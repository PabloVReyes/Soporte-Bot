import { getPausedServiceQuery, getServiceAssigned, getServicesNotAssigned, updateServiceQuery } from "@/bot/helpers/services.query";
import { Messages } from "@/bot/messages";
import { isWithinWorkingHours } from "@/bot/utils/working-hours";
import { io } from "@/socket";
import { startServiceReminder, stopServiceReminder } from "../new/utils";
import { SendMessageProps } from "../../types";

export const Concluded = async ({ phone, sock }: SendMessageProps) => {
    // Comprobar si existe un servicio activo
    const service: any = await getServiceAssigned(phone)

    if (!service) {
        return Messages.service.concluded.error.assigned
    }

    // Si existe un servicio marcar como concluido
    await updateServiceQuery(service.id, { concludedAt: new Date() })

    io.emit("updateData", { entity: "service", action: "concluded" });

    // Nortificar al tecnico que su servicio ya fue concluido
    await sock.sendMessage(phone, {
        text: Messages.service.concluded.success.technical(service)
    })

    // Notificar al usuario que su servicio ya fue concluido
    if (service.user.id !== phone) {
        await sock.sendMessage(service.user.id, {
            text: Messages.service.concluded.success.user(service)
        })
    }

    // Terminar el temporizador de recordatorio si existe
    stopServiceReminder(service.id);

    // Comprobar si el tecnico aún esta en horario laboral
    if (!isWithinWorkingHours(service.technical)) {
        return Messages.service.concluded.error.workingHours
    }

    // Comprobar si el tecnico tiene servicios pausados
    const resumeService = await getPausedServiceQuery(service.technicalId)
    if (resumeService) {
        return Messages.service.resume.success.technical(resumeService)
    }

    // Buscar un nuevo servicio
    const newService: any = await getServicesNotAssigned()
    
    if (!newService) {
        return Messages.service.concluded.success.notAssigned
    }

    // Si existe un servicio, asignarlo
    await updateServiceQuery(newService.id, { technicalId: service.technicalId, assignedAt: new Date() })

    // Crear un nuevo recordatorio para el tecnico
    startServiceReminder(newService.id, newService.technicalId, sock);

    // Notificar al usuario que su servicio es el siguiente
    if (newService.user.id !== phone) {
        await sock.sendMessage(newService.user.id, {
            text: Messages.service.new.success.user(service.technical.name)
        })
    }

    io.emit("updateData", { entity: "service", action: "assigned" });

    return Messages.service.new.success.assigned(newService, newService.user)
}