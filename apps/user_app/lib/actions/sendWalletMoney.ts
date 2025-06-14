"use server"

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { AUTH_CONFIG } from "../auth";
import { getBalance } from "./getBalance";

export async function sendWalletMoney(amount: string, email: string) {
    const balance = await getBalance();
    const session = await getServerSession(AUTH_CONFIG);
    const fromUserId: string = session.user.id;

    if (!fromUserId) {
        return {
            msg: "You are not logged in!",
            success: false
        }
    }
    // check if email id not same as current user
    if (session.user.email == email) {
        return {
            msg: "You cannot have your own email",
            success: false
        }
    }

    // check if other user exists (to whom amount is sent)
    const toUser = await prisma.user.findFirst({
        where: {
            email: email
        }
    })
    if (!toUser) {
        return {
            msg: "Given user does not exist",
            success: false
        }
    }

    // check if positive amount
    if (Number(balance?.amount) < 0) {
        return {
            msg: "Amount should be greater than 0",
            success: false
        }
    }

    // check if sufficient balance
    if (Number(balance?.amount) / 100 < Number(amount)) {
        return {
            msg: "Insufficient Balance",
            success: false
        }
    }
    // send money to given user and deduct balance from your end
    // also add transactions for both the users
    try {
        await prisma.$transaction(async (tx) => {
            // locking balance row for fromUser
            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId"=${fromUserId} FOR UPDATE`;
            const fromBalance = await tx.balance.findUnique({ where: { userId: fromUserId } });

            if (!fromBalance || fromBalance.amount / 100 < Number(amount))
                throw new Error("Insufficient Balance");

            await tx.balance.update({
                where: {
                    userId: fromUserId
                },
                data: {
                    amount: {
                        increment: Number(amount) * -100
                    }
                }
            });
            // increment at toUser
            await tx.balance.update({
                where: {
                    userId: toUser.id
                },
                data: {
                    amount: {
                        increment: Number(amount) * 100
                    }
                }
            });
            // add transaction details to database
            await tx.walletTransactions.create({
                data: {
                    status: "Success",
                    amount: Number(amount) * 100,
                    createdAt: new Date(),
                    fromUserId: fromUserId,
                    toUserId: toUser.id,
                }
            });
        })
    }
    catch (e) {
        console.log(e);
        return {
            msg: "Error in sending money",
            success: false
        }
    }


    return {
        msg: "Amount sent successfully!",
        success: true
    }
}