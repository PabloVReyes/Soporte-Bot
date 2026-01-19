import { io } from "../../../socket";
import { getLastPausedServiceQuery, getPausedServiceQuery, getServiceAssigned, getServiceCanceledQuery, getServicesNotAssigned, saveServiceQuery, updateServiceQuery } from "../../../bot/helpers/services.query";
import { getIsTechnicalNotAssigned, getTechnicalServicesCountToday, getTechnicalsNotAssignedQuery } from "../../../bot/helpers/technicals.query";
import { updateUserDataQuery } from "../../../bot/helpers/users.query";
import { Messages } from "../../../bot/messages";
import { isWithinWorkingHours } from "../../../bot/utils/working-hours";

interface Props {
    phone: string
    message: string
    sock?: any
}

///////////////////////
// Terminar servicio //
///////////////////////



///////////////////////
// Cancelar servicio //
///////////////////////

export const canceledService = async ({ phone, sock }: Props) => {
    const service: any = await getServiceCanceledQuery(phone)
    if (!service) {
        return Messages.service.canceled.error
    }

    await updateServiceQuery(service.id, { canceledAt: new Date() })
    io.emit("updateData", { entity: "service", action: "canceled" });

    // Enviar mensaje al tecnico donde muestre que el usuario cancelo su servicio
    if (service.technicalId) {
        await sock.sendMessage(service.technicalId, {
            text: Messages.service.canceled.success.technical(service, service.user)
        })

        // Buscar un nuevo servicio y asignarlo al tecnico
        const newService = await getServicesNotAssigned();
        if (!newService) {
            await sock.sendMessage(service.technicalId, {
                text: Messages.service.concluded.success.notAssigned
            })

            return Messages.service.canceled.success.user
        }

        // Si existe un servicio, asignarlo
        await updateServiceQuery(newService.id, { technicalId: service.technicalId, assignedAt: new Date() })

        // Notificar al usuario que su servicio es el siguiente
        if (newService.user.id !== phone) {
            await sock.sendMessage(newService.id, {
                text: Messages.service.new.success.user(service.technical.name)
            })
        }

        // Notificar al tecnico la asignación del usuario
        await sock.sendMessage(service.technicalId, {
            text: Messages.service.new.success.assigned(newService, newService.user)
        })
    }

    return Messages.service.canceled.success.user
}

/////////////////////
// Pausar servicio //
/////////////////////

export const pauseService = async ({ phone, sock }: Props) => {
    const service: any = await getServiceAssigned(phone)

    if (!service) {
        return Messages.service.paused.error
    }

    await updateServiceQuery(service.id, { pausedAt: new Date() })

    io.emit("updateData", { entity: "service", action: "paused" });

    // Verificar si existe un servicio en cola
    const newService = await getServicesNotAssigned()
    if (!newService) {
        return Messages.service.concluded.success.notAssigned
    }

    // Si existe un servicio, asignarlo
    await updateServiceQuery(newService.id, { assignedAt: new Date(), technicalId: service.technicalId })

    // Notificar al usuario que su servicio es el siguiente
    if (newService.user.id !== phone) {
        await sock.sendMessage(newService.userId, {
            text: Messages.service.new.success.user(service.technical.name)
        })
    }

    io.emit("updateData", { entity: "service", action: "assigned" });

    // Notificar al tecnico que se le asigno un nuevo servicio
    await sock.sendMessage(service.technicalId, {
        text: Messages.service.new.success.assigned(newService, newService.user)
    })

    return Messages.service.paused.success(service)
}

////////////////////////
// Continuar servicio //
////////////////////////

export const resumeService = async ({ phone, sock }: Props) => {
    const service: any = await getLastPausedServiceQuery(phone)

    if (!service) {
        return Messages.service.resume.error
    }

    io.emit("updateData", { entity: "service", action: "resume" });

    const technical = await getIsTechnicalNotAssigned(service.technicalId)
    await updateServiceQuery(service.id, { pausedAt: null })
    if (technical) {
        // Enviar mensaje al tecnico que continua el servicio
        await sock.sendMessage(service.technicalId, {
            text: Messages.service.resume.success.technical(service)
        })

        return Messages.service.resume.success.user(service)
    }

    return Messages.service.resume.success.notTechnical(service)

}