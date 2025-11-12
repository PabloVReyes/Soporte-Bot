import { Layout } from "@/layout";
import { Home } from "@/pages/Home";
import { Services } from "@/pages/Services";
import { Technicals } from "@/pages/Technicals";
import { Users } from "@/pages/Users";
import type { RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: (
            <Layout />
        ),
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/services',
                element: <Services />
            },
            {
                path: "/users",
                element: <Users />
            },
            {
                path: "/technicals",
                element: <Technicals />
            }
        ]
    }
]