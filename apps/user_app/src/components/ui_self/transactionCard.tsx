import { TransactionsSubCard } from "@repo/ui/card"

export const TransactionsCard = ({ title, transactions }) => {
    // console.log(transactions);
    return (
        <div className="bg-white rounded-2xl py-4 m-2 shadow-sm">
            <div className="border-b-2 py-2 mx-4 text-xl font-semibold">
                {title}
            </div>
            {/* {JSON.stringify(transactions)} */}
            {transactions.length == 0 ? <div className="mx-4 my-2 p-4 font-semibold rounded-xl bg-violet-100 text-violet-700">No transactions...</div> :
                transactions.map(t =>
                    <TransactionsSubCard onRampStatus={t.status} key={t.id} text={`${t.transType} INR`} amount={`Rs ${t.amount / 100}`} date={t.startTime.toUTCString()}>
                    </TransactionsSubCard>
                )
            }

            {/* <TransactionsSubCard text={"Withdrew INR"} amount="Rs 500" date="15th July, 2025"></TransactionsSubCard>
            <TransactionsSubCard text={"Withdrew INR"} amount="Rs 500" date="15th July, 2025"></TransactionsSubCard>
            <TransactionsSubCard text={"Withdrew INR"} amount="Rs 500" date="15th July, 2025"></TransactionsSubCard> */}
        </div>
    )
}
