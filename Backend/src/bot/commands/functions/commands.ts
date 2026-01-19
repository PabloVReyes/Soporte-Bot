import { allCommands } from "../commands"

export const getCommandsByRol = async ({ rol }: { rol: string }) => {
    const availableCommands = allCommands.filter((cmd: any) =>
        cmd.rol.includes(rol)
    )

    const allCommandsText = availableCommands
        .map((cmd: any) => {
            return `\n🔹 *${cmd.name}*\n${cmd.description}\n`
        })
        .join("")

    return `📃 Los comandos que tengo disponibles son:\n${allCommandsText}`
}


