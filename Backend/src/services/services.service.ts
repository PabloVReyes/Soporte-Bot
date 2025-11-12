import { getServicesCountByDayQuery, getServicesCountByTechAndDayQuery, getServicesCountQuery, getServicesQuery } from "@/helpers/services.query"

interface Props {
    page: string;
    limit: string;
}

export const getServicesService = async ({ page, limit }: Props) => {
    const skip = (Number(limit) * Number(page) - Number(limit))
    const take = Number(limit)

    const data: any = await getServicesQuery({ skip, take })

    const AllServices = [];
    data.map((item) => {
        let status = "CREATED"
        if (item.assignedAt) status = "ASSIGNED"
        if (item.concludedAt) status = "CONCLUDED"
        if (item.canceledAt) status = "CANCELED"
        if (item.pausedAt) status = "PAUSED"

        const Data = {
            id: item.id,
            status: status,
            description: item.description,
            user: item.user,
            technical: item.technical,
            createdAt: item.createdAt,
            concludedAt: item.concludedAt,
            assignedAt: item.assignedAt
        }

        AllServices.push(Data)
    })

    return AllServices
}

export const getServicesCountService = async () => {
    const data = await getServicesCountQuery()
    return data
}

export const getServicesCountByTechAndDayService = async () => {
    const data: any = await getServicesCountByTechAndDayQuery()
    const allData = []

    data.map((item) => {
        const fecha = new Date(item.date)
        const formato = fecha.toLocaleDateString("es-MX", {
            day: "numeric",
            month: "short",
            year: "numeric",
            timeZone: "UTC"
        });

        const Data = {
            name: item.name,
            date: formato,
            total: item.total
        }

        allData.push(Data)
    })

    return allData
}

export const getServicesCountByDayService = async () => {
    const data: any = await getServicesCountByDayQuery()
    const allData = [];

    data.map((item) => {
        const fecha = new Date(item.date)
        const formato = fecha.toLocaleDateString("es-MX", {
            day: "numeric",
            month: "short",
            year: "numeric",
            timeZone: "UTC"
        });

        const Data = {
            date: formato,
            total: item.total
        }

        allData.push(Data)
    })

    return allData;
}