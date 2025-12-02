import { database } from "../database/config"

export const getRolesQuery = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await database.rol.findMany({
                where: {
                    NOT: {
                        name: "NEW"
                    }
                }
            })
            resolve(data)
        } catch {
            reject([])
        }
    })
}