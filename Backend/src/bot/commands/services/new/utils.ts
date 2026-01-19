// serviceTimers.ts
import { getServiceAssigned } from "@/bot/helpers/services.query";

// Map para guardar intervalos por servicio
// Map para guardar intervalos por servicio
const serviceIntervals = new Map<number, ReturnType<typeof setInterval>>();

// Función para detener el recordatorio de un servicio
export const stopServiceReminder = (serviceId: number) => {
    const interval = serviceIntervals.get(serviceId);
    if (interval) {
        clearInterval(interval);
        serviceIntervals.delete(serviceId);
    }
};

// Función para iniciar el recordatorio cada 15 minutos
export const startServiceReminder = (
    serviceId: number,      // ID del servicio
    technicalId: string,    // ID del técnico (phone)
    sock: any               // objeto para enviar mensajes (tu sock)
) => {
    // Evitar duplicar intervalos
    if (serviceIntervals.has(serviceId)) return;

    const interval = setInterval(async () => {
        try {
            // Obtener el estado del servicio
            const service = await getServiceAssigned(technicalId); // retorna null o servicio completo

            // Si no existe o ya terminó/canceló, detener el recordatorio
            if (!service || service.concludedAt || service.canceledAt) {
                stopServiceReminder(serviceId);
                return;
            }

            // Enviar recordatorio al técnico
            await sock.sendMessage(technicalId, {
                text: `⏱️ Recordatorio: el servicio "${service.description || "Sin descripción"}" sigue activo y no ha sido concluido.`
            });

        } catch (error) {
            console.error("Error en temporizador de servicio", error);
        }
    }, 15 * 60 * 1000); // cada 15 minutos

    // Guardar el intervalo para poder detenerlo luego
    serviceIntervals.set(serviceId, interval);
};
