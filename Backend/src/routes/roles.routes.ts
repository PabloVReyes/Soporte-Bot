import { Router } from "express";
import { getRolesController } from "src/controllers/roles.controller";

const router: Router = Router()

router.get('/', getRolesController)

export default router