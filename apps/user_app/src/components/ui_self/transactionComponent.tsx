"use client"
import { motion } from "motion/react";
import { TransactionsSubCard } from "@repo/ui/card"
import { PageHeader } from "./pageHeader";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getOnRampTransactions } from "../../../lib/actions/getOnRampTransactions";
import { SkeletonTransCard } from "./skeleton";
import { ErrorCard } from "./errorCard";
import { getWalletTransactions } from "../../../lib/actions/getWalletTransactions";
import { useSession } from "next-auth/react";

export const TransactionsComp = () => {
    const [tab, setTab] = useState("bankTransactions");

    const bankTransactions = useQuery({
        queryKey: ["bankTransactions"],
        queryFn: getOnRampTransactions
    })

    const walletTransactions = useQuery({
        queryKey: ["walletTransactions"],
        queryFn: getWalletTransactions
    })


    return (
        <motion.div className="flex-auto h-full p-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: "easeIn" }}>
            <PageHeader title="Transactions"></PageHeader>
            <div className="flex py-4">
                <button onClick={() => { setTab("bankTransactions") }} className={` font-semibold ${tab == "bankTransactions" ? "bg-violet-500 text-white hover:bg-violet-600" : "bg-white text-violet-950 hover:text-violet-700"} rounded-xl px-3 py-2 mx-2 shadow-md`}>Bank Transactions</button>
                <button onClick={() => { setTab("walletTransactions") }} className={` font-semibold ${tab == "walletTransactions" ? "bg-violet-500 text-white hover:bg-violet-600" : "bg-white text-violet-950 hover:text-violet-700"} rounded-xl px-3 py-2 mx-2 shadow-md`}>Wallet Transactions</button>
            </div>
            <div className="bg-white rounded-2xl mx-2 py-4 px-2 shadow-sm">
                {tab == "bankTransactions" && <TransactionsDisplayComp type={TransType.bank} transactions={bankTransactions}></TransactionsDisplayComp>}
                {tab == "walletTransactions" && <TransactionsDisplayComp type={TransType.wallet} transactions={walletTransactions}></TransactionsDisplayComp>}
            </div>
        </motion.div>
    )
}

enum TransType {
    bank = "bank",
    wallet = "wallet"
}

const TransactionsDisplayComp = ({ type, transactions }: { type: TransType, transactions: any }) => {
    const session = useSession();
    const user: any = session.data?.user;
    console.log(user);

    if (type == "bank") {
        return (
            <>
                {
                    transactions.isPending ? <><SkeletonTransCard></SkeletonTransCard> <SkeletonTransCard></SkeletonTransCard> <SkeletonTransCard></SkeletonTransCard></> :
                        transactions.isError ? <ErrorCard errorMsg={transactions.error.message}></ErrorCard> :
                            transactions.data.length == 0 ? <div className="mx-2 my-2 p-4 bg-violet-100 text-violet-700 font-semibold rounded-xl">No transactions...</div> :
                                transactions.data.map((t: any) =>
                                    <TransactionsSubCard onRampStatus={t.status} key={t.id} text={t.transType} amount={`Rs ${t.amount / 100}`} date={t.createdAt.toUTCString().split(' ').slice(0, 4).join(' ')} >
                                    </TransactionsSubCard >
                                )
                }
            </>)
    }

    else if (type == "wallet") {
        return (
            <>
                {
                    transactions.isPending ? <><SkeletonTransCard></SkeletonTransCard> <SkeletonTransCard></SkeletonTransCard> <SkeletonTransCard></SkeletonTransCard></> :
                        transactions.isError ? <ErrorCard errorMsg={transactions.error.message}></ErrorCard> :
                            transactions.data.length == 0 ? <div className="mx-2 my-2 p-4 bg-violet-100 text-violet-700 font-semibold rounded-xl">No transactions...</div> :
                                transactions.data.map((t: any) =>
                                    <TransactionsSubCard onRampStatus={t.status} key={t.id} text={t.fromUserId == user.id ? "Sent" : "Received"} amount={t.fromUserId == user.id ? `- Rs ${t.amount / 100}` : `Rs ${t.amount / 100}`} date={t.createdAt.toUTCString().split(' ').slice(0, 4).join(' ')}>
                                    </TransactionsSubCard>
                                )
                }
            </>
        )
    }

}