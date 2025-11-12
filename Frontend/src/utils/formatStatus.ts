export const formatStatus = (status: string) => {
    switch (status) {
        case "CREATED":
            return { status: "Nuevo", color: "green" }
        case "ASSIGNED":
            return { status: "Asignado", color: "yellow" }
        case "CONCLUDED":
            return { status: "Concluido", color: "" }
        case "CANCELED":
            return { status: "Cancelado", color: "red" }
        case "PAUSED":
            return { status: "Pausado", color: "orange" }
    }
}