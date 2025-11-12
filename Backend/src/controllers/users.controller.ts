import { getUsersService } from "../services/users.service"
import { io } from "../socket"
import { RequestHandler } from "express"

export const getUsersController: RequestHandler = async (request, response) => {
    try {
        const data = await getUsersService()
        io.emit("users", data)
        response.json(data)
    } catch (error: any) {
        response.status(500)
            .send({
                msg: error.message || "Obtener usuarios"
            })
    }
}