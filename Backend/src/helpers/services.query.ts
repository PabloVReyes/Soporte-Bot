import { database } from "@/database/config"

interface Props {
    skip: number;
    take: number;
}

export const getServicesQuery = async ({ skip, take }: Props) => {
    return new Promise(async (resolve, reject) => {
        try {
            const Services = await database.service.findMany({
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    user: true,
                    technical: true
                },
                take,
                skip
            })
            resolve(Services)
        } catch {
            reject([])
        }
    })
}

export const getServicesCountQuery = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const Services = await database.service.count()

            resolve(Services)
        } catch {
            reject(0)
        }
    })
}

export const getServicesCountByTechAndDayQuery = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await database.$queryRaw<
                { technicalId: string; name: string; date: string; total: bigint }[]
            >`
  SELECT 
    u.id AS technicalId,
    u.name AS name,
    DATE(CONVERT_TZ(s.concludedAt, '+00:00', '-06:00')) AS date,
    COUNT(*) AS total
  FROM Service s
  JOIN User u ON s.technicalId = u.id
  WHERE s.technicalId IS NOT NULL
    AND s.concludedAt IS NOT NULL   -- 🔥 Solo servicios concluidos
  GROUP BY u.id, DATE(CONVERT_TZ(s.concludedAt, '+00:00', '-06:00'))
  ORDER BY date ASC;
`;

            const fixed = result.map(r => ({
                ...r,
                total: Number(r.total),
            }));


            resolve(fixed)
        } catch {
            reject(false)
        }
    })
}

export const getServicesCountByDayQuery = async () => {
    try {
        const result = await database.$queryRaw<
            { date: string; total: bigint }[]
        >`
      SELECT 
        DATE(CONVERT_TZ(s.concludedAt, '+00:00', '-06:00')) AS date,
        COUNT(*) AS total
      FROM Service s
      WHERE s.concludedAt IS NOT NULL   -- solo servicios concluidos
      GROUP BY DATE(CONVERT_TZ(s.concludedAt, '+00:00', '-06:00'))
      ORDER BY date ASC;
    `;

        const fixed = result.map(r => ({
            ...r,
            total: Number(r.total),
        }));
        
        return fixed
    } catch (error) {
        console.error("Error al obtener servicios por día:", error);
        throw error;
    }
};