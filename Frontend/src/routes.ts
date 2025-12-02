import { IconDashboardFilled, IconDeviceHeartMonitorFilled, IconUserFilled } from "@tabler/icons-react";

interface Props {
    label: string;
    icon: any;
    link?: string;
    links?: any[]
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
        link: '/services'
    },
    {
        label: "Usuarios",
        icon: IconUserFilled,
        links: [
            {
                label: "Usuarios",
                link: "/users"
            },
            {
                label: "Personal del área",
                link: "/users/area-staff"
            }
        ]
    },
]