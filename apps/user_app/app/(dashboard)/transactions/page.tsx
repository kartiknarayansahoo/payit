import { TransactionsComp } from "@/components/ui_self/transactionComponent";
import { getOnRampTransactions } from "../../../lib/actions/getOnRampTransactions";

export default async function () {

  return (
    <>
      {/* {JSON.stringify(session.data)}; */}
      {/* <Transactions></Transactions> */}
      <TransactionsComp></TransactionsComp>
    </>
  );
}

