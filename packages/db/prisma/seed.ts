import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";
const prisma = new PrismaClient()

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@gmail.com' },
    update: {},
    create: {
      email: 'alice@gmail.com',
      password: await bcrypt.hash('alice', 10),
      name: 'alice',
      createdAt: new Date(),
      updatedAt: new Date(),
      Balance: {
        create: {
          amount: 20000,
          locked: 0
        }
      },
      OnRampTransaction: {
        create: {
          status: "Success",
          token: "token__1",
          provider: "HDFC Bank",
          amount: 20000,
          createdAt: new Date(),
          transType: "Deposit"
        },
      },
    },
  });
  
  const bob = await prisma.user.upsert({
    where: { email: 'bob@gmail.com' },
    update: {},
    create: {
      email: 'bob@gmail.com',
      password: await bcrypt.hash('bob', 10),
      name: 'bob',
      createdAt: new Date(),
      updatedAt: new Date(),
      Balance: {
        create: {
          amount: 2000,
          locked: 0
        }
      },
      OnRampTransaction: {
        create: {
          status: "Failure",
          token: "token__2",
          provider: "Axis Bank",
          amount: 20000,
          createdAt: new Date(),
          transType: "Deposit"
        },
      },
    },
  });
  console.log({ alice, bob })
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