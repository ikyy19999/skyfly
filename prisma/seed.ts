const { PrismaClient } = require('../src/generated/prisma')
const bcrypt = require('bcrypt');


const prisma = new PrismaClient()

const password = bcrypt.hashSync("admin123", 10)

async function main() {
    const userSeed = await prisma.user.create({
        data: {
            email: "admin@skyfly.com",
            name: "Admin",
            role: "ADMIN",
            password
        }
    })

    console.log({userSeed});
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })