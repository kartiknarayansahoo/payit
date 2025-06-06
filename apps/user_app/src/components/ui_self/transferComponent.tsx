"use client"
import { motion } from "motion/react";
import { TransferCard } from "./transferCard";
import { PageHeader } from "./pageHeader";
import { InfoCard } from "./infocard";
import { BalanceCard } from "./balanceCard";
import { WalletTransactionsCard } from "./transactionCard";

export const Transfer = () => {

    return (
        <motion.div className="flex-auto h-full p-2" initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeIn" }}>
            <PageHeader title="Transfer"></PageHeader>
            <InfoCard title={"Send money to other users using your wallet balance"} tab={""}></InfoCard>
            {/* <div className="flex items-center justify-center m-4"> */}
            <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl py-2">
                <div>
                    <TransferCard></TransferCard>
                </div>
                <div className="my-2 mx-2">
                    <div className="mb-2">
                        <BalanceCard></BalanceCard>
                    </div>
                    <div>
                        <WalletTransactionsCard title="Recent Wallet Transactions"></WalletTransactionsCard>
                    </div>
                </div>

            </div>
        </motion.div>
    )
}