import { getUsersQuery } from "../helpers/user.query"

const phone = (jid: string) => {
    const numbers = jid.split('@')[0].replace(/\D/g, ''); // parte antes de @, solo dígitos
    return numbers.length > 10 ? numbers.slice(-10) : numbers;
}

export const getUsersService = async () => {
    const data: any = await getUsersQuery()
    const allUsers: any = [];

    data.map((item: any) => {
        const Data = {
            phone: phone(item.id),
            matricula: item.matricula,
            area: item.area,
            ext: item.ext,
            ip: item.ip,
            rol: item.rol.name
        }

        allUsers.push(Data)
    })

    return (allUsers)
}