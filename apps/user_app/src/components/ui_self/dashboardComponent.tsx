import { BalanceCard, LargeBalanceCard } from "./balanceCard"
import { PageHeader } from "./pageHeader"
import { motion } from "motion/react";
import { TransactionsCard, WalletTransactionsCard } from "./transactionCard";


export const Dashboard = () => {
    return (
        <motion.div className="flex-auto px-2" initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeIn" }}>
            <PageHeader title="Dashboard"></PageHeader>
            <div className="px-2">
                <div>
                    <LargeBalanceCard></LargeBalanceCard>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 my-2">
                    <div className="">
                        <TransactionsCard title={"Recent Bank Transactions"}></TransactionsCard>
                    </div>
                    <div className="">
                        <WalletTransactionsCard title="Recent Wallet Transactions"></WalletTransactionsCard>
                    </div>
                </div>

            </div>
        </motion.div>
    )
}