"use client"
import { useState } from "react";
import toast from "react-hot-toast";
import { sendWalletMoney } from "../../../lib/actions/sendWalletMoney";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const TransferCard = () => {
    const [amount, setAmount] = useState("");
    const [email, setEmail] = useState("");
    const queryClient = useQueryClient();
    const router = useRouter();

    // debouncing
    let tid = null;
    function updateAmount(e) {
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

    let tid2 = null;
    function updateEmail(e) {
        if (tid2) clearTimeout(tid2);
        tid2 = setTimeout(() => {
            const val = e.target.value;
            setEmail(val);
        }, 1500);
    }


    return (
        <>
            <form onSubmit={async (e) => {
                e.preventDefault();
                const res = await sendWalletMoney(amount, email);
                console.log(res);
                if (res?.success) {
                    toast.success(res.msg);
                    queryClient.invalidateQueries({ queryKey: ["balance"] });
                    queryClient.invalidateQueries({ queryKey: ["walletTransactions"] });
                    router.refresh();
                }
                else {
                    toast.error(res.msg);
                }
            }}>
                <div className="flex flex-col flex-auto bg-white p-4 rounded-xl shadow-sm m-2">
                    <div className="border-b-2 text-xl py-2 font-semibold">
                        Send
                    </div>
                    <div className="">
                        <div className="pt-2 font-medium">
                            Email
                        </div>
                        <input onChange={e => updateEmail(e)} required className="bg-stone-100 w-full p-2 my-2 outline outline-stone-200 rounded-md" type="email" />
                    </div>
                    <div className="">
                        <div className="pt-2 font-medium">
                            Amount
                        </div>
                        <input onChange={e => updateAmount(e)} required className="bg-stone-100 w-full p-2 my-2 outline outline-stone-200 rounded-md" type="number" step={"0.01"} placeholder="0.00" />
                    </div>
                    <div className="pt-4 self-center">
                        <button type="submit" className="bg-violet-200 hover:bg-violet-300 py-2 px-4 rounded-lg text-violet-700 font-medium">Send Money</button>
                    </div>
                </div>
            </form>
        </>
    )
}