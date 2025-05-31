import prisma from "@repo/db/client";
import { Wallet } from "@/components/ui_self/walletComponent";
import { getServerSession } from "next-auth";
import { AUTH_CONFIG } from "../../../lib/auth";

export default async function () {
  const transactions = await getOnRampTransactions();
  const balance = await getBalance();
  // console.log(`transactions: ${transactions}`);

  return (
    <>
      {/* {JSON.stringify(session.data)}; */}
      <Wallet transactions={transactions} balance={balance}></Wallet>
    </>
  );
}

export async function getBalance() {
  const session = await getServerSession(AUTH_CONFIG);
  const userId = session.user.id;
  if (userId) {
    const balance = await prisma.balance.findFirst({
      where: {
        userId: userId
      }
    })

    return balance;
  }
}

export async function getOnRampTransactions() {
  const session = await getServerSession(AUTH_CONFIG);
  console.log(`getOnRampTransactions called`);

  if (session) {
    const transactions = await prisma.onRampTransaction.findMany({
      orderBy: {
        startTime: "desc"
      },
      where: {
        userId: session.user.id
      }
    })

    return transactions;
  }

  return null;
}



