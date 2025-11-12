import { Router } from "express";
import userRoutes from "@/routes/users.routes"
import servicesRoutes from "@/routes/services.routes"
import technicalRoutes from "@/routes/technicals.routes"

const router: Router = Router()

router.get('/', (request, response) => {
    try {
        response.json({
            api: "Soporte Tecnico",
            status: "Ok"
        })
    } catch (error) {
        response.status(500).send({
            api: "Soporte Tecnico",
            status: "Error",
            message: error
        })
    }
})

router.use("/api/users", userRoutes)
router.use("/api/services", servicesRoutes)
router.use("/api/technicals", technicalRoutes)

module.exports = router;