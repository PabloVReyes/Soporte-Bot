import { RequestHandler } from "express";
import { getRolesService } from "src/services/roles.service";

export const getRolesController: RequestHandler = async (req, res) => {
    try {
        const data = await getRolesService()
        res.json(data)
    } catch (error: any) {
        res.status(500)
            .send({
                msg: error.message || "Obtener roles"
            })
    }
}