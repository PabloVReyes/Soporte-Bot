import { getUsersQuery, putUserQuery } from "../helpers/user.query"

const phone = (jid: string) => {
    const numbers = jid.split('@')[0].replace(/\D/g, ''); // parte antes de @, solo dígitos
    return numbers.length > 10 ? numbers.slice(-10) : numbers;
}

export const getUsersService = async (whereClause: any) => {
    const data: any = await getUsersQuery(whereClause)
    const allUsers: any = [];

    data.map((item: any) => {
        const Data = {
            id: item.id,
            name: item.name,
            matricula: item.matricula,
            area: item.area,
            phone: phone(item.id),
            ext: item.ext,
            ip: item.ip,
            rol: item.rol.name,
            status: item.ServiceAssigned.length > 0 ? "working" : "available",
            WorkingHours: item.WorkingHours
        }

        allUsers.push(Data)
    })

    return (allUsers)
}

export const putUserService = async (values: any, { id }: any) => {
    await putUserQuery(values, id)
    return true
}