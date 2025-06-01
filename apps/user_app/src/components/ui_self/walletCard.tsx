"use client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { motion } from "motion/react";
import { Dispatch, SetStateAction, useState } from "react";
import { createOnRampTransactions } from "../../../lib/actions/createOnRampTransactions";
import { TransTypeStatus } from "@prisma/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";


const bank_config_list = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com/netbanking/"
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/bank-smart/internet-banking/getting-started"
  }
]

export const WalletSubCard = ({ transType }: { transType: TransTypeStatus }) => {
  const [amount, setAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();


  // debouncing and two decimal amount implemented
  let tid = null;
  function updateAmount(e) {
    console.log(tid);
    if (tid) clearTimeout(tid);
    tid = setTimeout(() => {
      const val = e.target.value;
      console.log(typeof (val));
      console.log(val);
      let parseVal = val;
      if (val) {
        parseVal = parseFloat(val).toFixed(2);
      }
      setAmount(parseVal);
      e.target.value = parseVal.toString();
    }, 1500);
  }

  return (
    <div className="bg-white rounded-2xl p-4 mt-2 mx-2 shadow-sm">
      <div className="flex flex-wrap border-b-2 py-2 text-xl font-semibold">
        <motion.div className="pr-2" initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: "easeIn" }}>
          {transType}
        </motion.div>
        <div>
          <motion.div key={amount} className={` ${transType == "Deposit" ? "text-green-500" : "text-red-500"} ${amount ? "pr-2" : ""}`} initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeIn" }}>
            {transType == "Deposit" && amount ? `+${amount} INR` : null}
            {transType == "Withdraw" && amount ? `-${amount} INR` : null}
          </motion.div>
        </div>
        <div>
          <motion.div key={bankName} className="text-violet-500" initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeIn" }}>
            {transType == "Deposit" && bankName ? `from ${bankName}` : null}
            {transType == "Withdraw" && bankName ? `to ${bankName}` : null}
          </motion.div>
        </div>
      </div>
      <div>
        <div className="pt-2 font-medium">Amount</div>
        <input type="number" step={"0.01"} onChange={e => updateAmount(e)} className="bg-stone-100 w-full p-2 my-2 outline outline-stone-200 rounded-md" placeholder="0.00" />
      </div>
      <div>
        <div className="pt-2 font-medium">Bank</div>
        <div>
          <SelectMenu onValueChange={(value) => {
            setBankName(value);
            setRedirectUrl(bank_config_list.find(b => b.name == value)?.redirectUrl || "");
          }}></SelectMenu>
        </div>
      </div>
      <div className="justify-self-center mt-6">
        <button className="bg-violet-500 hover:bg-violet-600 px-4 py-2 rounded-lg text-white font-medium shadow-sm" onClick={async () => {
          const res = await createOnRampTransactions(amount, bankName, transType);
          if (res.success) {
            toast.success(res.msg);
            queryClient.invalidateQueries({ queryKey: ["bankTransactions"] });
            queryClient.invalidateQueries({ queryKey: ["balance"] });
            router.refresh();
          }
          else {
            toast.error(res.msg);
          }
          // console.log(res);
          // window.location.href = redirectUrl;

          // transType == "Deposit" && res.success ? window.open(redirectUrl) : null; // opens new window with bank url
        }}>{transType} Money</button>
      </div>
    </div>
  )
}

export const SelectMenu = ({ onValueChange }: { onValueChange: Dispatch<SetStateAction<string>> }) => {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="w-full text-[16px] bg-stone-100 outline outline-stone-200 py-4 my-2">
        <SelectValue placeholder="Banks" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="HDFC Bank">HDFC Bank</SelectItem>
        <SelectItem value="Axis Bank">Axis Bank</SelectItem>
      </SelectContent>
    </Select>
  )

}