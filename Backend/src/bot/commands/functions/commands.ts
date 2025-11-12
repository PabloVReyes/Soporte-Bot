import { allCommands } from "..";

export const getCommandsByRol = async ({rol}: {rol: string}) => {
    const availableCommands = allCommands.filter(cmd =>
        cmd.rol.includes(rol)
    )

    const allCommandsText = availableCommands
        .map(cmd => {
            return `\n🔹 *${cmd.name}*\n`
        })
        .join("")

    return `📃 Los comandos que tengo disponibles son:\n${allCommandsText}`
}


