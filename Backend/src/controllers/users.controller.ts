import { getUsersService, putUserService } from "../services/users.service"
import { io } from "../socket"
import { RequestHandler } from "express"

export const getUsersController: RequestHandler = async (request, response) => {
    try {
        const data = await getUsersService({
            NOT: {
                rol: {
                    OR: [
                        { name: "TECHNICAL" },
                        { name: "TECHNICAL_SUPPORT_MANAGER" }
                    ]
                }
            }
        })
        response.json(data)
    } catch (error: any) {
        response.status(500)
            .send({
                msg: error.message || "Obtener usuarios"
            })
    }
}

export const getTechnicalsSupportManagerController: RequestHandler = async (req, res) => {
    try {
        const data = await getUsersService({
            rol: {name: "TECHNICAL_SUPPORT_MANAGER"}
        })
        res.json(data)
    } catch (error: any) {
        res.status(500)
            .send({
                msg: error.message || "Obtener encargado de soporte tecnico"
            })
    }
}

export const getTechnicalsController: RequestHandler = async (req, res) => {
    try {
        const data = await getUsersService({
            rol: { name: "TECHNICAL" }
        })

        res.json(data)
    } catch (error: any) {
        res.status(500)
            .send({
                msg: error.message || "Obtener tecnicos"
            })
    }
}

export const putUserController: RequestHandler = async (req, res) => {
    try {
        const { body, params } = req
        await putUserService(body, params)
        res.json("Ok")
    } catch (error: any) {
        res.status(500)
            .send({
                msg: error.message || "Actualizar usuario"
            })
    }
}