import { getTechnicalsController, updateTechnicalController } from "@/controllers/technicals.controller";
import { Router } from "express";

const router: Router = Router()

router.get('/', getTechnicalsController)
router.put('/:id', updateTechnicalController)
export default router