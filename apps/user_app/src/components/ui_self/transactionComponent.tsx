"use client"
import { motion } from "motion/react";
import { TransactionsSubCard } from "@repo/ui/card"
import { PageHeader } from "./pageHeader";

export const TransactionsComp = ({ transactions }) => {
    return (
        <motion.div className="flex-auto h-full p-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: "easeIn" }}>
            <PageHeader title="Transactions"></PageHeader>
            <div className="bg-white rounded-2xl py-4 px-2 shadow-sm">
                {transactions.length == 0 ? <div className="mx-2 my-2 p-4 bg-violet-100 text-violet-700 font-semibold rounded-xl">No transactions...</div> :
                    transactions.map(t =>
                        <TransactionsSubCard onRampStatus={t.status} key={t.id} text={`${t.transType}`} amount={`Rs ${t.amount / 100}`} date={t.startTime.toUTCString()}>
                        </TransactionsSubCard>
                    )
                }
            </div>
        </motion.div>
    )
}