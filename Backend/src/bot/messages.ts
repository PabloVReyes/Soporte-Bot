export const Messages = {
    welcome: {
        welcome: "¡Hola! 👋\n\nSoy un asistente virtual 🤖 diseñado para apoyarte con tus solicitudes y requerimientos técnicos.\n\nCuando presentes algún inconveniente, me encargaré de registrarlo y notificar al equipo de soporte para que te brinden atención de manera oportuna.\n\nSi deseas conocer todas las funciones que tengo disponibles, solo envíame la palabra Comandos.\n\nActualmente me encuentro en versión BETA y fui actualizado por última vez el 12 de noviembre de 2025.\n\nAntes de continuar necesito saber algunos datos"
    },
    matricula: {
        ask: "📘 Por favor, ingresa tu *Matrícula* (4 dígitos).\n\nEjemplo: 6792",
        success: (text: string) => `✅ Matrícula registrada: *${text}*\n\n🏢 Ahora, indícame tu *Área de trabajo*.\n\nEjemplo: Informática`,
        error: (text: string) => `⚠️ La matrícula *${text}* ya se encuentra registrada por otro usuario.\n\nSi crees que esto es un error, por favor contacta a un administrador.`
    },
    area: {
        error: "🏢 Ingresa un área válida.\n\nEjemplo: Servicios Generales",
        success: (text: string) => `✅ Área registrada: *${text}*\n\n📞 Ahora, dime tu *Extensión Telefónica* (4 dígitos).\n\nEjemplo: 1035`,
    },
    ext: {
        error: "⚠️ Extensión inválida. Debe tener 4 dígitos.\n\nEjemplo: 1035",
        success: (text: string) => `✅ Extensión registrada: *${text}*\n\n💻 Por último, indícame la *Dirección IP* de tu equipo.\n\nEjemplo: 10.30.50.254`,
    },
    ip: {
        error: "⚠️ Dirección IP inválida. Ejemplo: 10.30.50.254",
        success: `🎉 ¡Registro completado con éxito!\n\nYa puedes usar todas mis funciones.\n\nEscribe *Comandos* para ver lo que puedo hacer.`
    },
    service: {
        new: {
            ask: [
                `🆕 Por favor, describe brevemente el servicio o problema técnico que deseas reportar.\n\nEjemplo: "La computadora del área de contabilidad no enciende."`,
                `🧰 ¡Perfecto! Cuéntame qué sucede o qué servicio necesitas.\n\nPor ejemplo: "Necesito ayuda con la impresora del área de Recursos Humanos."`,
                `🆕 Describe brevemente el servicio a realizar o el problema detectado`,
                `😊 ¡Listo! Ahora solo necesito que me digas qué está pasando o qué servicio necesitas.\n\nEjemplo: “El monitor de mi equipo no enciende.”`,
                `🧠 Cuéntame con tus palabras cuál es el problema o solicitud que quieres registrar.`,
                `🗣️ Perfecto, ¿qué servicio técnico deseas solicitar hoy?`,
                `🧾 Entendido. Escríbeme una breve descripción del inconveniente o tarea que necesites que el equipo técnico atienda.`,
                `🔍 Para continuar, necesito que me describas el servicio o problema que quieres reportar.\n\nEjemplo: “La red del área de compras está caída.”`
            ],
            error: {
                length: "⚠️ La descripción es muy corta. Por favor, proporciona más detalles.",
                technical: "⚠️ Por el momento todos los técnicos se encuentran ocupados, su servicio será asignado pronto..."
            },
            success: {
                technical: "🥸 El servicio se te fue asignado, suerte para la próxima...",
                assigned: (service: any, user: any) => `🥸 Se te ha asignado un nuevo servicio:\n\n🎟️ *Numero de servicio:* ${service.id}\nℹ️ *Informacion:* ${service.description}\n😺 *Matricula:* ${user.matricula || "N/D"}\n🏬 *Area:* ${user.area || "N/D"}\n☎️ *Extension Telefonica:* ${user.extension || "N/D"}\n💻 *Direccion IP:* ${user.ip || "N/D"}`,
                user: (technical: string) => `🥸 Tu servicio es el siguiente...\n\n*🧑‍💻 Técnico asignado*\n ${technical}`
            }
        },
        concluded: {
            error: {
                assigned: `⚠️ No tienes ningún servicio asignado`,
                workingHours: `🕓 Estás fuera de tu horario laboral, no se te asignarán más servicios por hoy.`
            },
            success: {
                notAssigned: `😌 No hay ningún servicio por asignar, puedes descansar`,
                technical: (service: any) => `✅ Servicio #${service.id} concluido\n\n*Descripción*\n${service.description}`,
                user: (service: any) => `✅ Su servicio fue concluido. Gracias por su paciencia\n\n*Información del servicio*\n🎟️ *Número:* ${service.id}\nℹ️ *Descripción:* ${service.description}\n🧑‍💻 *Técnico asignado:* ${service.technical?.name}`
            }
        },
        canceled: {
            error: `🤔 No tienes ningún servicio que puedas cancelar`,
            success: {
                user: `🥺 Tu servicio se ha cancelado\n\nLamento no poder ayudarte esta vez.`,
                technical: (service: any, user: any) => `😓 El servicio ha sido cancelado:\n\n🎟️ *Número de servicio:* ${service.id}\nℹ️ *Descripción:* ${service.description}\n😺 *Matrícula:* ${user.matricula}\n🏬 *Área:* ${user.area}\n☎️ *Extensión telefónica:* ${user.extension}\n💻 *Dirección IP:* ${user.ip}`
            }
        },
        paused: {
            error: `🤔 No tienes ningún servicio que puedas pausar`,
            success: (service: any) => `⏸️ Servicio pausado correctamente\n\n🎟️ *Número de servicio:* ${service.id}\nℹ️ *Descripción:* ${service.description}`
        },
        resume: {
            error: `😔 No tienes ningún servicio pausado actualmente para reanudar.`,
            success: {
                technical: (service: any) => `🔔 Se te ha reasignado el servicio *#${service.id}* que estaba pausado. Descripción: ${service.description}`,
                user: (service: any) => `✅ Servicio *#${service.id}* reanudado y reasignado a *${service.technical.name}*`,
                notTechnical: (service: any) => `✅ Servicio *#${service.id}* reanudado, pero *${service.technical.name}* se encuentra ocupado. Se te asignará tan pronto como esté disponible.`
            }
        }
    },
    error: [
       `❌ El comando proporcionado no se encuentra en mis registros. \nUsa el comando *comandos* para ver la lista completa de funciones disponibles.`,
       `⚠️ Comando no identificado.\nEjecuta *comandos* para obtener una lista de instrucciones válidas.`,
       `🤔 Mmm... no reconozco ese comando.\nPrueba con *comandos* para ver todo lo que puedo hacer.`,
       `😅 Ups... ese comando no me suena.\nPuedes escribir *comandos* para ver todo lo que sé hacer.`,
       `🤔 Parece que ese comando no está en mi lista.\nPrueba con *comandos* y te muestro todas mis funciones disponibles.`,
       `🚫 Comando misterioso detectado.\nSi quieres ver mi repertorio completo, escribe *comandos*.`,
       `😄 Creo que no conozco ese comando todavía.\nPero no te preocupes, usa *comandos* y te enseño lo que sí puedo hacer.`,
       `👋 Hola, parece que ese comando no existe (¡aún!).\nEscribe *comandos* para ver las opciones que tengo disponibles.`,
       `⚠️ Ese comando no está registrado en mi sistema\nUsa *comandos* para ver los que tengo disponibles.`,
       `🕵️‍♂️ Hmm… ese comando no aparece en mis archivos secretos.\nPrueba con *comandos* y descubrirás todas mis habilidades.`
    ]
}