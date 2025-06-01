"use client"
import { Wallet } from "@/components/ui_self/walletComponent";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function () {
  const session = useSession();

  if (session.status == "unauthenticated") {
    redirect('/auth/signin');
  }


  return (
    <>
      {/* {JSON.stringify(session.data)}; */}
      <Wallet></Wallet>
    </>
  );
}






