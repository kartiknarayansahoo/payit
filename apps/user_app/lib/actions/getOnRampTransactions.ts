"use server"
import { getServerSession } from "next-auth";
import { AUTH_CONFIG } from "../auth";
import prisma from "@repo/db/client";

export async function getOnRampTransactions() {
    const session = await getServerSession(AUTH_CONFIG);
    const user = session.user;
    console.log(`getOnRampTransactions called`);

    if (session.user) {
        const transactions = await prisma.onRampTransaction.findMany({
            orderBy: {
                createdAt: "desc"
            },
            where: {
                userId: user.id
            }
        })

        return transactions;
    }

    return null;
}
