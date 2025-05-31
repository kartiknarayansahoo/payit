"use server"
import { getServerSession } from "next-auth";
import { AUTH_CONFIG } from "../auth";
import prisma from "@repo/db/client";

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
