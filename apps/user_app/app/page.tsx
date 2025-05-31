import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { AUTH_CONFIG } from "../lib/auth";

export default async function Home() {
  const session = await getServerSession(AUTH_CONFIG);

  if (session) {
    redirect('/dashboard');
  }
  else {
    redirect('/api/auth/signin');
  }
}
