import { getTechnicalsQuery, updateTechnicalQuery } from "@/helpers/technical.query";

const phone = (jid: string) => {
    const numbers = jid.split('@')[0].replace(/\D/g, ''); // parte antes de @, solo dígitos
    return numbers.length > 10 ? numbers.slice(-10) : numbers;
}

export const getTechnicalsService = async () => {
    const data: any = await getTechnicalsQuery()
    const allData = [];

    data.map((item) => {
        const Data = {
            id: item.id,
            phone: phone(item.id),
            name: item.name,
            status: item.ServiceAssigned.length > 0 ? "working" : "available",
            WorkingHours: item.WorkingHours
        }

        allData.push(Data)
    })

    return allData;
}

export const updateTechnicalService = async (values: any, { id }: any) => {
    await updateTechnicalQuery(values, id)
    return true
}