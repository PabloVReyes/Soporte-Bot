import { commands } from "../../bot/commands";

export const detectCommand = async (rol: string, text: string) => {
    const allCommands = await commands(rol)

    // Normalizar el mensaje 
    const message = text
        .replace(/[^\p{L}\p{N}\s]/gu, "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s]/gi, "")
        .trim();

    for (const command of allCommands) {
        for (const key of command.key) {
            const keyNorm = key
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-z0-9\s]/gi, "")
                .trim();

            const regex = new RegExp(`\\b${keyNorm}\\b`, "i");
            if (regex.test(message)) {
                return command
            }
        }
    }
}