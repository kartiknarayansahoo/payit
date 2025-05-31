"use client"
import { motion } from "motion/react";
import { TransactionsSubCard } from "@repo/ui/card"
import { PageHeader } from "./pageHeader";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getOnRampTransactions } from "../../../lib/actions/getOnRampTransactions";

export const TransactionsComp = () => {
    const [tab, setTab] = useState("bankTransactions");

    const { isPending, isError, data, error } = useQuery({
        queryKey: ["bankTransactions"],
        queryFn: getOnRampTransactions
    })


    if (isPending) {
        return (
            <div>
                Pending data;
            </div>
        )
    }

    if (isError) {
        return (
            <div>
                Error encountered
                {error.message};
            </div>
        )
    }

    return (
        <motion.div className="flex-auto h-full p-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: "easeIn" }}>
            <PageHeader title="Transactions"></PageHeader>
            <div className="flex py-4">
                <button onClick={() => { setTab("bankTransactions") }} className={` font-semibold ${tab == "bankTransactions" ? "bg-violet-500 text-white hover:bg-violet-600" : "bg-white text-violet-950 hover:text-violet-700"} rounded-xl px-3 py-2 mx-2 shadow-md`}>Bank Transactions</button>
                <button onClick={() => { setTab("walletTransactions") }} className={` font-semibold ${tab == "walletTransactions" ? "bg-violet-500 text-white hover:bg-violet-600" : "bg-white text-violet-950 hover:text-violet-700"} rounded-xl px-3 py-2 mx-2 shadow-md`}>Wallet Transactions</button>
            </div>
            <div className="bg-white rounded-2xl py-4 px-2 shadow-sm">
                {data.length == 0 ? <div className="mx-2 my-2 p-4 bg-violet-100 text-violet-700 font-semibold rounded-xl">No transactions...</div> :
                    data.map(t =>
                        <TransactionsSubCard onRampStatus={t.status} key={t.id} text={`${t.transType}`} amount={`Rs ${t.amount / 100}`} date={t.startTime.toUTCString()}>
                        </TransactionsSubCard>
                    )
                }
            </div>
        </motion.div>
    )
}