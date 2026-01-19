import { allCommandsProps } from "../types";
import { getCommandsByRol } from "./functions/commands";
import { canceledService, pauseService, resumeService } from "./functions/services";
import { Services } from "./services";


export const allCommands: any = [
    ...Services,
    {
        name: "Comandos",
        description: "Lista de comandos",
        key: ["comandos", "help"],
        rol: ["USER", "TECHNICAL", "TECHNICAL_SUPPORT_MANAGER"],
        responseFunction: getCommandsByRol
    },
    {
        name: "Cancelar servicio",
        description: "Cancelar un servicio asignado",
        key: ["cancelar servicio", "cancelar"],
        rol: ["USER", "TECHNICAL", "TECHNICAL_SUPPORT_MANAGER"],
        responseFunction: canceledService
    },
    {
        name: "Pausar servicio",
        description: "Pausa tu servicio actualmente asignado",
        key: ["pausar servicio"],
        rol: ["TECHNICAL", "TECHNICAL_SUPPORT_MANAGER"],
        responseFunction: pauseService
    },
    {
        name: "Continuar servicio",
        description: "Continua tu servicio pausado",
        key: ["continuar servicio"],
        rol: ["TECHNICAL", "TECHNICAL_SUPPORT_MANAGER"],
        responseFunction: resumeService
    }
]

export const commands = async (rol: string) => {
    return allCommands.filter((cmd: any) => cmd.rol.includes(rol)) || [];
};