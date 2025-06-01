import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";

const saltRounds = 10;

export const AUTH_CONFIG = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Email',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jdoe@email.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {

                const hashpass = await bcrypt.hash(credentials?.password, saltRounds)
                const existingUser = await db.user.findFirst({
                    where: { email: credentials?.email }
                })
                console.log(existingUser);

                // check for existing user
                if (existingUser != null) {
                    console.log("inside validpass check")
                    const validPass = await bcrypt.compare(credentials?.password, existingUser.password);
                    if (validPass) {
                        return {
                            id: existingUser.id,
                            name: existingUser.name,
                            email: existingUser.email
                        }
                    }
                    return null;
                }

                // create new user and set balance as 0
                try {
                    const user = await db.user.create({
                        data: {
                            email: credentials?.email || "",
                            password: hashpass || "",
                            createdAt: new Date(),
                            updatedAt: new Date(),
                            Balance: {
                                create: {
                                    amount: 0,
                                    locked: 0
                                }
                            }
                        }
                    })

                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name
                    }
                }
                catch (e) {
                    console.log(e);
                }

                return null;
            }
        }),
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async session({ token, session }: any) {
            session.user.id = token.sub

            return session
        }
    },
    pages: {
        signIn: '/auth/signin',
    }
}