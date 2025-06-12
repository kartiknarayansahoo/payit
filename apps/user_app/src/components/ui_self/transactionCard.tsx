"use client"
import { TransactionsSubCard } from "@repo/ui/card"
import { getOnRampTransactions } from "../../../lib/actions/getOnRampTransactions"
import { useQuery } from "@tanstack/react-query"
import { SkeletonTransCard } from "./skeleton"
import { ErrorCard } from "./errorCard"
import { getWalletTransactions } from "../../../lib/actions/getWalletTransactions"
import { useSession } from "next-auth/react"

export const TransactionsCard = ({ title }: { title: string }) => {
    const { isPending, isError, data, error } = useQuery({
        queryKey: ["bankTransactions"],
        queryFn: getOnRampTransactions
    })


    // console.log(transactions);
    return (
        <div className="bg-white rounded-2xl py-4 shadow-sm">
            <div className="border-b-2 py-2 mx-4 text-xl font-semibold">
                {title}
            </div>
            {/* {JSON.stringify(transactions)} */}
            {isPending ? <><SkeletonTransCard></SkeletonTransCard> <SkeletonTransCard></SkeletonTransCard></> :
                isError ? <ErrorCard errorMsg={error.message}></ErrorCard> :
                    data != null && data != undefined ?
                        data.length == 0 ?
                            <div className="mx-4 my-2 p-4 font-semibold rounded-xl bg-violet-100 text-violet-700">No transactions...</div> :
                            data.map(t =>
                                <TransactionsSubCard onRampStatus={t.status} key={t.id} text={`${t.transType} INR`} amount={`Rs ${t.amount / 100}`} date={t.createdAt.toUTCString().split(' ').slice(0, 4).join(' ')}>
                                </TransactionsSubCard>
                            ) : <div>Data is undefined</div>
            }

            {/* <TransactionsSubCard text={"Withdrew INR"} amount="Rs 500" date="15th July, 2025"></TransactionsSubCard>
            <TransactionsSubCard text={"Withdrew INR"} amount="Rs 500" date="15th July, 2025"></TransactionsSubCard>
            <TransactionsSubCard text={"Withdrew INR"} amount="Rs 500" date="15th July, 2025"></TransactionsSubCard> */}
        </div>
    )
}

export const WalletTransactionsCard = ({ title }: { title: string }) => {
    const session = useSession();
    const user: any = session.data?.user;
    const { isPending, isError, data, error } = useQuery({
        queryKey: ["walletTransactions"],
        queryFn: getWalletTransactions
    })


    // console.log(transactions);
    return (
        <div className="bg-white rounded-2xl py-4 shadow-sm">
            <div className="border-b-2 py-2 mx-4 text-xl font-semibold">
                {title}
            </div>
            {/* {JSON.stringify(transactions)} */}
            {isPending ? <><SkeletonTransCard></SkeletonTransCard> <SkeletonTransCard></SkeletonTransCard></> :
                isError ? <ErrorCard errorMsg={error.message}></ErrorCard> :
                    data != null && data != undefined ?
                        data.length == 0 ?
                            <div className="mx-4 my-2 p-4 font-semibold rounded-xl bg-violet-100 text-violet-700">No transactions...</div> :
                            data.map(t =>
                                <TransactionsSubCard onRampStatus={t.status} key={t.id} text={t.fromUserId == user.id ? "Sent" : "Received"} amount={t.fromUserId == user.id ? `- Rs ${t.amount / 100}` : `Rs ${t.amount / 100}`} date={t.createdAt.toUTCString().split(' ').slice(0, 4).join(' ')}>
                                </TransactionsSubCard>
                            ) : <div> Data is undefined</div>
            }

            {/* <TransactionsSubCard text={"Withdrew INR"} amount="Rs 500" date="15th July, 2025"></TransactionsSubCard>
            <TransactionsSubCard text={"Withdrew INR"} amount="Rs 500" date="15th July, 2025"></TransactionsSubCard>
            <TransactionsSubCard text={"Withdrew INR"} amount="Rs 500" date="15th July, 2025"></TransactionsSubCard> */}
        </div >
    )
}
