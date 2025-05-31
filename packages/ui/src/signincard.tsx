import { useState } from "react"

interface SignInProps {
    signIn: any
}

export const SigninCard = ({ signIn }: SignInProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            signIn('credentials', { 'email': email, 'password': password, 'callbackUrl': '/dashboard' })
        }}>
            <div className="bg-white p-10 rounded-3xl text-center h-fit shadow-sm">
                {/* {JSON.stringify(email)} */}
                {/* {JSON.stringify(password)} */}
                <div className="text-2xl font-bold py-4">
                    Sign in to PayIt
                </div>
                <div>
                    <div className="">
                        <input onChange={e => setEmail(e.target.value)} className="w-full py-4 px-2 mx-100 mb-1 bg-slate-200 rounded-t-xl rounded-b-sm outline-violet-700 bg-stone-100 hover:bg-stone-200" type="email" placeholder="Email" required />
                    </div>
                    <div>
                        <input onChange={e => setPassword(e.target.value)} className="w-full py-4 px-2 bg-slate-200 rounded-b-xl rounded-t-sm outline-violet-700 bg-stone-100 hover:bg-stone-200" type="password" placeholder="Password" required />
                    </div>
                </div>
                <div>
                    <button type="submit" className="w-full my-2 py-2 px-20 rounded-xl bg-violet-700 hover:bg-violet-800 text-white shadow-md">Sign In</button>
                </div>
            </div>
        </form>
    )
}