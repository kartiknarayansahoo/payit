"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
    const session = useSession();

    return (
        <div>
            {JSON.stringify(session.data)};
            <div className="bg-red-200 flex">
                <div className="flex h-max">
                    adf
                </div>
            </div>
        </div>
    );
}
