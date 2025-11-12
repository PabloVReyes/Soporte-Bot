export const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffSec = Math.floor(diffMs / 1000)
    const diffMin = Math.floor(diffSec / 60)
    const diffHour = Math.floor(diffMin / 60)
    const diffDay = Math.floor(diffHour / 24)

    if (diffDay >= 1) {
        return date.toLocaleDateString("es-MX", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    } else if (diffHour >= 1) {
        return `hace ${diffHour} hora${diffHour > 1 ? "s" : ""}`
    } else if (diffMin >= 1) {
        return `hace ${diffMin} minuto${diffMin > 1 ? "s" : ""}`
    } else {
        return `hace unos segundos`
    }
}