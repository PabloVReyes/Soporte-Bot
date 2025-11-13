import { allCommandsProps } from "../types";
import { getCommandsByRol } from "./functions/commands";
import { canceledService, concludedService, pauseService, resumeService, startNewService } from "./functions/services";

export const allCommands: allCommandsProps[] = [
    {
        name: "Solicitar Servicio",
        description: "Solicitar apoyo con un servicio",
        key: ["nuevo servicio", "solicitar servicio"],
        rol: ["USER", "TECHNICAL"],
        responseFunction: startNewService
    },
    {
        name: "Comandos",
        description: "Lista de comandos",
        key: ["comandos", "help"],
        rol: ["USER", "TECHNICAL"],
        responseFunction: getCommandsByRol
    },
    {
        name: "Terminar servicio",
        description: "Terminar un servicio asignado",
        key: ["terminar", "concluded", "terminar servicio"],
        rol: ["TECHNICAL"],
        responseFunction: concludedService
    },
    {
        name: "Cancelar servicio",
        description: "Cancelar un servicio asignado",
        key: ["cancelar servicio", "cancelar"],
        rol: ["USER", "TECHNICAL"],
        responseFunction: canceledService
    },
    {
        name: "Pausar servicio",
        description: "Pausa tu servicio actualmente asignado",
        key: ["pausar servicio"],
        rol: ["TECHNICAL"],
        responseFunction: pauseService
    },
    {
        name: "Continuar servicio",
        description: "Continua tu servicio pausado",
        key: ["continuar servicio"],
        rol: ["TECHNICAL"],
        responseFunction: resumeService
    }
]

export const commands = async (rol: string) => {
    return allCommands.filter((cmd) => cmd.rol.includes(rol)) || [];
};