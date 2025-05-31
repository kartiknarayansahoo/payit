import { TransactionsComp } from "@/components/ui_self/transactionComponent";
import { getOnRampTransactions } from "../wallet/page";

export default async function () {
  const transactions = await getOnRampTransactions();

  return (
    <>
      {/* {JSON.stringify(session.data)}; */}
      {/* <Transactions></Transactions> */}
      <TransactionsComp transactions={transactions}></TransactionsComp>
    </>
  );
}

