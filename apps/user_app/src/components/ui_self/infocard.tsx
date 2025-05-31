import { motion } from "motion/react";

export const InfoCard = ({ title, tab }: { title: string, tab: string }) => {
    return (
        <div className="mx-2 px-4 py-4 bg-violet-200 font-semibold text-violet-700 rounded-xl flex shadow-sm">
            <div className="pr-2">
                <InfoIcon></InfoIcon>
            </div>
            <motion.div key={tab} initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: "easeIn" }}>
                {tab == "" && title}
                {tab == "deposit" && "Deposit/Add money to wallet from bank."}
                {tab == "withdraw" && "Withdraw/Remove money from wallet to bank."}
            </motion.div>
        </div>
    )
}

const InfoIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
        </svg>
    )
}