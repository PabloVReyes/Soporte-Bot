import { database } from "../database/config"

export const getUsersQuery = async() => {
    return new Promise(async (resolve, reject) => {
        try {
            const Users = await database.user.findMany({
                where: {
                    NOT: {
                        rol: {name: "TECHNICAL"}
                    }
                },
                include: {
                    rol: true
                }
            })
            resolve(Users)
        } catch {
            reject ([])
        }
    })
}
