"use client"
import { TransactionsComp } from "@/components/ui_self/transactionComponent";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

export default function () {
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

