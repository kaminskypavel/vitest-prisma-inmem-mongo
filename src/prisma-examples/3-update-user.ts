import { PrismaClient } from '@prisma/client'
import "./commons/env";

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.update({
    where: {
      email: 'hana@hana.io',
    },
    data: {
      lastName: 'Peters',
    },
  })
  console.log(user)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
