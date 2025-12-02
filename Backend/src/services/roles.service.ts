import { getRolesQuery } from "../helpers/roles.query"

export const getRolesService = async () => {
    const data = await getRolesQuery()
    return data
}