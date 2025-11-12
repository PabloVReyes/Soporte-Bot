import { database } from "../../database/config"

export const getUserDataQuery = async (phone: string) => {
    try {
        const user = await database.user.upsert({
            where: { id: phone },
            create: {
                id: phone,
                rol: {
                    connect: { name: "NEW" }
                }
            },
            update: {},
            include: {
                rol: true
            }
        })

        return user
    } catch (error) {
        console.error("Error en getUserDataQuery", error)
        throw new Error("Error al obtener o crear usuario")
    }
}

// Guardar datos del usuario
export const updateUserDataQuery = async (phone: any, data: Record<string, any>) => {
    try {
        const user = await database.user.update({
            where: { id: phone },
            data
        })

        return user
    } catch (error) {
        console.error("Error en updateUserDataQuery", error)
        throw new Error("Error al actualizar usuario")
    }
}

// Actualizar rol de usuario
export const updateUserRol = async (phone: string, rol: string) => {
    try {
        await database.user.update({
            where: {
                id: phone
            },
            data: {
                rol: {
                    connect: { name: rol }
                }
            }
        })

        return;
    } catch (error) {
        console.error("Error en updateUserRol", error)
        throw new Error("Error al actualizar rol")
    }
}

export const getUserDataByMatriculaQuery = (matricula: string) => {
    try {
        const user = database.user.findUnique({
            where: {
                matricula
            }
        })

        return user
    } catch (error) {
        console.error("Error al obtener usuario", error)
        throw new Error("Error al obtener usuario")
    }
}