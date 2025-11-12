import { useRoutes } from "react-router-dom"
import { routes } from "./routes/routes"
import "@/theme/style.css"

export const App = () => {
    const routing = useRoutes(routes)
    return routing
}