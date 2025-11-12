import { getTechnicalsService, updateTechnicalService } from "@/services/technicals.service"
import { RequestHandler } from "express"

export const getTechnicalsController: RequestHandler = async (respuest, response) => {
    try {
        const data = await getTechnicalsService()
        response.json(data)
    } catch (error: any) {
        response.status(500)
            .send({
                msg: error.message || "Obtener Lista de Tecnicos"
            })
    }
}

export const updateTechnicalController: RequestHandler = async (request, response) => {
    try {
        const {body, params} = request
        await updateTechnicalService(body, params)
        response.json('Ok')
    } catch (error: any) {
        response.status(500)
            .send({
                msg: error.message || "Actualizar información del tecnico"
            })
    }
}