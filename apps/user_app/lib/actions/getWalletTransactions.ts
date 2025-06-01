"use server"
import { getServerSession } from "next-auth";
import { AUTH_CONFIG } from "../auth";
import prisma from "@repo/db/client";

export async function getWalletTransactions() {
    const session = await getServerSession(AUTH_CONFIG);
    const user = session.user;
    console.log(`getOnRampTransactions called`);

    if (user) {
        const transactions = await prisma.walletTransactions.findMany({
            orderBy: {
                createdAt: "desc"
            },
            where: {
                OR: [
                    { fromUserId: user.id },
                    { toUserId: user.id }
                ]
            }
        });

        return transactions;
    }

    return null;
}
