import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Iniciando seed de la base de datos...')

    // Ejemplo: insertar roles
    await prisma.rol.createMany({
        data: [
            { name: "NEW" },
            { name: "USER" },
            { name: "TECHNICAL" }
        ],
        skipDuplicates: true,
    })

    await prisma.user.create({
        data: {
            id: "5212261048352@s.whatsapp.net",
            name: "Pablo Vazquez Reyes",
            rol: { connect: { name: "TECHNICAL" } },
        }
    })

    // await prisma.user.create({
    //     data: {
    //         id: "5212281467754@s.whatsapp.net",
    //         name: "Dylan Alejandro Velasquez Leonardo",
    //         rol: { connect: { name: "TECHNICAL" } },
    //     }
    // })

    console.log('✅ Seed completado con éxito.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
