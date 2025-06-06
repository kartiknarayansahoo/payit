"use client"
import { useState } from "react";
import { WalletSubCard } from "./walletCard";
import { BalanceCard } from "./balanceCard";
import { TransactionsCard } from "./transactionCard";
import { motion } from "motion/react";
import { PageHeader } from "./pageHeader";
import { InfoCard } from "./infocard";
import { useQuery } from "@tanstack/react-query";
import { getBalance } from "../../../lib/actions/getBalance";

export const Wallet = () => {
    const [tab, setTab] = useState("deposit");

    return (
        <motion.div className="flex-auto h-full p-2" initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeIn" }}>
            <PageHeader title="Wallet"></PageHeader>
            <div className="flex py-4">
                <button onClick={() => { setTab("deposit") }} className={` font-semibold ${tab == "deposit" ? "bg-violet-500 text-white hover:bg-violet-600" : "bg-white text-violet-950 hover:text-violet-700"} rounded-xl px-3 py-2 mx-2 shadow-md`}>Deposit</button>
                <button onClick={() => { setTab("withdraw") }} className={` font-semibold ${tab == "withdraw" ? "bg-violet-500 text-white hover:bg-violet-600" : "bg-white text-violet-950 hover:text-violet-700"} rounded-xl px-3 py-2 mx-2 shadow-md`}>Withdraw</button>
            </div>
            <InfoCard title={""} tab={tab}></InfoCard>
            <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl py-2">
                <div>
                    {tab == "deposit" && <WalletSubCard transType={"Deposit"}></WalletSubCard>}
                    {tab == "withdraw" && <WalletSubCard transType={"Withdraw"}></WalletSubCard>}
                </div>
                <div className="my-2 mx-2">
                    <div className="mb-2">
                        <BalanceCard></BalanceCard>
                    </div>
                    <div>
                        <TransactionsCard title={"Recent Bank Transactions"}></TransactionsCard>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
