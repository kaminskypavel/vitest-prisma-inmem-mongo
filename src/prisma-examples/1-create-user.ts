import { PrismaClient } from '@prisma/client'
import "./commons/env";

const prisma = new PrismaClient()

async function main() {
  const hana = await prisma.user.create({
    data: {
      email: 'hana@hana.io',
      firstName: 'Hana',
      lastName: 'Gold',
    },
  })

  console.log(hana)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
