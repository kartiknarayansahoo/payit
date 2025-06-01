"use client"
import { Button as CustomBtn } from "@repo/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname, useRouter } from "next/navigation"
import { signIn, signOut, useSession } from "next-auth/react"

interface AppbarProps {
    onSignIn: () => void
    onSignOut: () => void
    user?: {
        name?: string | null
    }
}

const Appbar = ({ onSignIn, onSignOut, user }: AppbarProps) => {
    const router = useRouter();
    const pathName = usePathname();

    return (
        <div className="flex items-center justify-between px-2 text-violet-700">
            <div className="p-2 text-3xl text-purple font-bold">
                <button onClick={() => router.push('/dashboard')}>PayIt</button>
            </div>
            <div className="flex p-2 items-center">
                <div>
                    <CustomBtn className="px-4 py-2 font-semibold rounded-md bg-violet-200 hover:bg-violet-300 shadow-sm" onClick={user ? onSignOut : onSignIn}>{user ? "Sign Out" : "Sign In"}</CustomBtn>
                </div>
                <div className={`p-2 ml-2 hover:cursor-pointer md:hidden ${pathName == "/auth/signin" ? "hidden" : ""} `}>
                    <HamburgerMenu></HamburgerMenu>
                </div>
            </div>
        </div>
    )
}

export const AppbarClient = () => {
    const session = useSession();

    return (
        <>
            <Appbar onSignIn={signIn} onSignOut={() => { signOut({ callbackUrl: '/api/auth/signin' }) }} user={session.data?.user}></Appbar>
        </>
    )
}

const HamburgerMenu = () => {
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="size-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem className="text-violet-700 font-semibold focus:bg-violet-200 focus:text-violet-700">
                        <Button redirectPath="/dashboard" text="Home"></Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-violet-700 font-semibold focus:bg-violet-200 focus:text-violet-700"><Button redirectPath="/wallet" text="Wallet"></Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-violet-700 font-semibold focus:bg-violet-200 focus:text-violet-700"><Button redirectPath="/transfer" text="Transfer"></Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-violet-700 font-semibold focus:bg-violet-200 focus:text-violet-700"><Button redirectPath="/transactions" text="Transactions"></Button>
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

const Button = ({ redirectPath, text }: any) => {
    const router = useRouter();

    return <button className="w-full text-left text-lg" onClick={() => { router.push(redirectPath) }} >
        {text}
    </button>
}