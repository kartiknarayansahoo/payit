import { getServerSession } from "next-auth"
import { AUTH_CONFIG } from "../../../lib/auth";
import { NextResponse } from "next/server";

export const GET = async () => {
    const session = await getServerSession(AUTH_CONFIG);

    if (session.user) {
        return NextResponse.json({
            user: session.user
        })
    }
    return NextResponse.json({
        msg: "User is not logged in!"
    }, { status: 403 })
}