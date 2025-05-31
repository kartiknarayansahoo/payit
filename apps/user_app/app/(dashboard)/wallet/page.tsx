import { Wallet } from "@/components/ui_self/walletComponent";
import { getOnRampTransactions } from "../../../lib/actions/getOnRampTransactions";
import { getBalance } from "../../../lib/actions/getBalance";

export default async function () {
  const transactions = await getOnRampTransactions();
  const balance = await getBalance();
  // console.log(`transactions: ${transactions}`);

  return (
    <>
      {/* {JSON.stringify(session.data)}; */}
      <Wallet transactions={transactions} balance={balance}></Wallet>
    </>
  );
}






