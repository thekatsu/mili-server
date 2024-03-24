const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main(){

  await prisma.user.deleteMany({});

  await prisma.user.create({
      data:{
          name: 'Usuario 1',
          email: 'usuario1@email.com'
      }
  })

  const users = await prisma.user.findMany({})
  console.log(users)
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