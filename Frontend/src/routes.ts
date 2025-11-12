import { IconAssemblyFilled, IconDashboardFilled, IconDeviceHeartMonitorFilled, IconUserFilled } from "@tabler/icons-react";

interface Props {
    label: string;
    icon: any;
    link?: string;
}

export const routes: Props[] = [
    {
        label: "Inicio",
        icon: IconDashboardFilled,
        link: '/'
    }, 
    {
        label: "Servicios",
        icon: IconDeviceHeartMonitorFilled,
        link: '/Services'
    },
    {
        label: "Usuarios",
        icon: IconUserFilled,
        link: "/Users"
    },
    {
        label: "Técnicos",
        icon: IconAssemblyFilled,
        link: "/Technicals"
    }
]