import { getTechnicalsController, getTechnicalsSupportManagerController, getUsersController, putUserController } from "../controllers/users.controller";
import { Router } from "express";

const router: Router = Router()

router.get('/', getUsersController)
router.get('/technicals', getTechnicalsController)
router.get('/technicals/manager', getTechnicalsSupportManagerController)
router.put('/:id', putUserController)

export default router