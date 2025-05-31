"use server"
import { getServerSession } from "next-auth";
import { AUTH_CONFIG } from "../auth";
import prisma from "@repo/db/client";

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