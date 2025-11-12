import { getServicesController, getServicesCountByDayController, getServicesCountByTechANdDayController, getServicesCountController } from "@/controllers/services.controller";
import { Router } from "express";

const router: Router = Router()

router.get('/', getServicesController)
router.get('/count', getServicesCountController)
router.get('/count/technical', getServicesCountByTechANdDayController)
router.get('/count/day', getServicesCountByDayController)
export default router