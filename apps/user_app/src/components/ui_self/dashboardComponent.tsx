import { BalanceCard, LargeBalanceCard } from "./balanceCard"
import { PageHeader } from "./pageHeader"
import { motion } from "motion/react";


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

            </div>
        </motion.div>
    )
}