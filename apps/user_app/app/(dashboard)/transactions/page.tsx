"use client"
import { TransactionsComp } from "@/components/ui_self/transactionComponent";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Transactions() {
  const session = useSession();

  if (session.status == "unauthenticated") {
    redirect('/auth/signin');
  }

  return (
    <>
      {/* {JSON.stringify(session.data)}; */}
      {/* <Transactions></Transactions> */}
      <TransactionsComp></TransactionsComp>
    </>
  );
}

