"use server"
import { getServerSession } from "next-auth"
import { AUTH_CONFIG } from "../auth"
import prisma from "@repo/db/client";
import { TransTypeStatus } from "@prisma/client";
import { getBalance } from "../../app/(dashboard)/wallet/page";


// this function will be called when the add money button is clicked
// and it will add a pending transaction to the database, and redirect to the bank page
export async function createOnRampTransactions(amount: string, bankName: string, transType: TransTypeStatus) {
    const session = await getServerSession(AUTH_CONFIG);
    const balance = await getBalance();
    const userId = session.user.id;
    const token = Math.random().toString(); // this will be the token which we get from the specific banking api

    if (!userId) {
        return {
            msg: "User not logged in!",
            success: false
        };
    }

    if (Number(amount) <= 0) {
        return {
            msg: "Amount should be greater than 0",
            success: false
        }
    }
    if (bankName == "") {
        return {
            msg: "Select a bank",
            success: false
        }
    }

    if (transType == "Withdraw") {
        if (Number(balance?.amount) / 100 < Number(amount)) {
            return {
                msg: "Insufficient Balance",
                success: false
            };
        }

        // add transaction and update balance
        const res = await prisma.$transaction([
            prisma.onRampTransaction.create({
                data: {
                    status: "Success",
                    token: token,
                    provider: bankName,
                    amount: Number(amount) * -100,
                    startTime: new Date(),
                    userId: userId,
                    transType: transType
                }
            }),
            prisma.balance.update({
                where: {
                    userId: userId
                },
                data: {
                    amount: {
                        increment: Number(amount) * -100
                    }
                }
            })
        ])
    }

    else if (transType == "Deposit") {
        const res = await prisma.onRampTransaction.create({
            data: {
                status: "Pending",
                token: token,
                provider: bankName,
                amount: Number(amount) * 100,
                startTime: new Date(),
                userId: userId,
                transType: transType
            }
        })
    }


    return {
        msg: "On ramp transaction added!",
        success: true
    };
}