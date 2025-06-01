"use client"
import { usePathname, useRouter } from "next/navigation";
import { motion } from "motion/react";

export const Sidebar = () => {
    return (
        <motion.div className="flex-initial hidden md:inline" initial={{ opacity: 0, x: -20 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3, ease: "easeIn" }}>
            <div className="p-2 w-full">
                <div className="px-4 pt-2">
                    <Button redirectPath="/dashboard" text="Home" svgIcon={<HomeIcon></HomeIcon>}></Button>
                </div>
                <div className="px-4 pt-2">
                    <Button redirectPath="/wallet" text="Wallet" svgIcon={<WalletIcon></WalletIcon>}></Button>
                </div>
                <div className="px-4 pt-2">
                    <Button redirectPath="/transfer" text="Transfer" svgIcon={<TransferIcon></TransferIcon>}></Button>
                </div>
                <div className="px-4 pt-2">
                    <Button redirectPath="/transactions" text="Transactions" svgIcon={<TransactionIcon></TransactionIcon>}></Button>
                </div>
            </div>
        </motion.div>
    )
}

const Button = ({ redirectPath, svgIcon, text }: any) => {
    const router = useRouter();
    const pathName = usePathname();

    const isActive = pathName === redirectPath
    return <button onClick={() => { router.push(redirectPath) }} className={`flex flex-col w-full items-start justify-center xl:justify-start xl:flex xl:flex-row xl:items-center font-bold ${isActive ? "text-violet-600" : "text-stone-500"} hover:text-violet-700 xl:text-lg text-xs`}>
        {/* {JSON.stringify(pathName)} */}
        {svgIcon}
        {text}
    </button>
}

const WalletIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="size-11 pr-3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
        </svg>
    )
}

const TransferIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="size-11 pr-3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
        </svg>
    )
}

const TransactionIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="size-11 pr-3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    )
}

const HomeIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="size-11 pr-3">
            <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
    )
}