import { useQuery } from "@tanstack/react-query";
import { getBalance } from "../../../lib/actions/getBalance";

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