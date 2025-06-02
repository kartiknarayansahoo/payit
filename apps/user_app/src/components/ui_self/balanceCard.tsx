"use client"
import { useQuery } from "@tanstack/react-query";
import { getBalance } from "../../../lib/actions/getBalance";
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation";

export const BalanceCard = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["balance"],
    queryFn: getBalance
  });


  return (
    <div className="bg-white rounded-2xl p-4 m-2 shadow-sm">
      <div className="border-b-2 py-2 text-xl font-semibold">
        Balance
      </div>
      <div className="flex pt-2 justify-between items-center font-semibold">
        <div className="">Total Balance</div>
        {isPending ? <div className="animate-pulse bg-violet-300 w-1/5 p-2 rounded-full"></div> :
          isError ? <div className="text-red-500">Error: {error?.message}</div> :
            <div>Rs {data.amount / 100}</div>
        }
      </div>
      <div className="flex pt-2 justify-between items-center font-semibold">
        <div className="">Total Locked Amount</div>
        {isPending ? <div className="animate-pulse bg-violet-300 w-1/5 p-2 rounded-full"></div> :
          isError ? <div className="text-red-500">Error: {error?.message}</div> :
            <div>Rs {data?.locked / 100}</div>
        }
      </div>
    </div>
  )
}


export const LargeBalanceCard = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["balance"],
    queryFn: getBalance
  });

  return (
    <div className="bg-gradient-to-br from-white via-violet-200 to-violet-500 rounded-xl p-4 drop-shadow-md">
      {/* balance */}
      <div className="">
        <div className="p-2 text-xl font-medium text-violet-700">Wallet Balance</div>
        <div className="p-2 text-4xl font-bold text-violet-500">{isPending ? <div className="animate-pulse bg-violet-300 w-2/5 md:w-1/5 px-6 py-4 rounded-full"></div> :
          isError ? <div className="text-red-500">Error: {error?.message}</div> :
            <div>Rs {data.amount / 100}</div>
        }</div>
      </div>
      {/* buttons */}
      <div className="flex flex-wrap gap-2 justify-start py-2 px-2">
        <Button onClick={() => redirect('/wallet')} className="bg-violet-500 hover:bg-violet-600 text-lg font-xl text-white gap-0 drop-shadow-md"><WalletIcon></WalletIcon>Add Money</Button>
        <Button onClick={() => redirect('/transfer')} className="bg-violet-200 border-2 border-violet-500 hover:bg-violet-100 text-lg font-xl text-violet-700 gap-0 drop-shadow-md"><TransferIcon></TransferIcon>Transfer</Button>
        <Button onClick={() => redirect('/transactions')} className="bg-violet-200 border-2 border-violet-500 hover:bg-violet-100 text-lg font-xl text-violet-700 gap-0 drop-shadow-md"><TransactionIcon></TransactionIcon>History</Button>
      </div>
    </div>
  )
}


const WalletIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="!size-9 pr-3">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
    </svg>
  )
}

const TransferIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="!size-9 pr-3">
      <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
  )
}

const TransactionIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="!size-9 pr-3">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  )
}