import { getUsersController } from "@/controllers/users.controller";
import { Router } from "express";

const router: Router = Router()

router.get('/', getUsersController)

export default router