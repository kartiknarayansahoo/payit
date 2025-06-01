"use client"
import { SigninCard } from "@repo/ui/signincard";
import { signIn } from "next-auth/react";
import { motion } from "motion/react"

export default function Signin() {

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex justify-center items-center h-svh">
                <SigninCard signIn={signIn}></SigninCard>
            </div>
        </motion.div>
    )
}   