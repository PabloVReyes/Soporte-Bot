import { CommandsProps } from "../types/Commands";
import { Concluded } from "./concluded";
import { Start } from "./new";

export const Services: CommandsProps[] = [
    {
        name: "Solicitar Servicio",
        description: "Solicitar apoyo con un servicio",
        key: ["nuevo servicio", "solicitar servicio"],
        rol: ["USER", "TECHNICAL", "TECHNICAL_SUPPORT_MANAGER"],
        responseFunction: Start
    },
    {
        name: "Terminar servicio",
        description: "Terminar un servicio asignado",
        key: ["terminar", "concluded", "terminar servicio"],
        rol: ["TECHNICAL", "TECHNICAL_SUPPORT_MANAGER"],
        responseFunction: Concluded
    },
]