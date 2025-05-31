export const BalanceCard = ({ unlockedBal, totalLockedAmt, totalBal }: { unlockedBal: string, totalLockedAmt: string, totalBal: string }) => {
  return (
    <div className="bg-white rounded-2xl p-4 m-2 shadow-sm">
      <div className="border-b-2 py-2 text-xl font-semibold">
        Balance
      </div>
      <div className="flex pt-2 justify-between items-center font-semibold">
        <div className="">Total Balance</div>
        <div>
          {totalBal}
        </div>
      </div>
      <div className="flex pt-2 justify-between items-center font-semibold">
        <div className="">Total Locked Amount</div>
        <div>
          {totalLockedAmt}
        </div>
      </div>
    </div>
  )
}