import { getServicesCountByDayService, getServicesCountByTechAndDayService, getServicesCountService, getServicesService } from "@/services/services.service";
import { RequestHandler } from "express";

export const getServicesController: RequestHandler = async (request, response) => {
    try {
        const query: any = request.query
        const data = await getServicesService(query)
        response.json(data)
    } catch (error: any) {
        response.status(500)
            .send({
                msg: error.message || "Obtener servicios"
            })
    }
}

export const getServicesCountController: RequestHandler = async(request, response) => {
    try {
        const data = await getServicesCountService()
        response.json(data)
    } catch (error: any) {
        response.status(500)
            .send({
                msg: error.message || "Obtener cantidad de servicios"
            })
    }
}

export const getServicesCountByTechANdDayController: RequestHandler = async(request, response) => {
    try {
        const data = await getServicesCountByTechAndDayService()
        response.json(data)
    } catch (error: any) {
        response.status(500)
            .send({
                msg: error.message || "Obtener cantidad de servicios por tecnico"
            })
    }
}

export const getServicesCountByDayController: RequestHandler = async(request, response) => {
    try {
        const data = await getServicesCountByDayService()
        response.json(data)
    } catch (error: any) {
        response.status(500)
            .send({
                msg: error.message || "Obtener cantidad de servicios por dia"
            })
    }
}