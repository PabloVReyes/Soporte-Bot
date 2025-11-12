import { useEffect } from "react";
import { socket } from "@/socket";
import { notify } from "@/utils/notify";
import { useServiceStore } from "@/store/serviceStore";

export const SocketListener = () => {
    const { setShouldReload, setDashboardReload } = useServiceStore();

    useEffect(() => {
        const handleUpdate = ({ entity, action }: any) => {
            if (entity === "service") {
                setShouldReload(true);

                switch (action) {
                    case "create":
                        notify({
                            type: "success",
                            title: "Nuevo servicio",
                            message: "Se ha creado un nuevo servicio.",
                        });
                        break;
                    case "concluded":
                        setDashboardReload(true)
                        notify({
                            type: "info",
                            title: "Servicio concluido",
                            message: "Un servicio ha sido concluido.",
                        });
                        break;
                    case "assigned":
                        notify({
                            type: "info",
                            color: "yellow",
                            title: "Servicio asignado",
                            message: "Se ha asignado un servicio a un técnico.",
                        });
                        break;
                    case "canceled":
                        notify({
                            type: "error",
                            title: "Servicio cancelado",
                            message: "Se ha cancelado un servicio.",
                        });
                        break;
                    case "paused":
                        notify({
                            type: "info",
                            title: "Servicio pausado",
                            color: "orange",
                            message: "Se ha pausado un servicio.",
                        });
                        break;
                    case "resume":
                        notify({
                            type: "info",
                            title: "Continuando servicio",
                            color: "green",
                            message: "Se ha continuado con un servicio previamente pausado",
                        });
                        break;
                    default:
                        break;
                }
            }
        };

        socket.on("updateData", handleUpdate);

        return () => {
            console.log("🧹 SocketListener desmontado");
            socket.off("updateData", handleUpdate);
        };
    }, [setShouldReload]);

    return null;
};
