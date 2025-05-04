import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Link from "next/link";

async function Navigation() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="flex justify-between items-center text-amber-50 p-4 text-lg font-semibold">
      <Link href={"/"}>Home</Link>
      <div className="flex justify-between gap-2">
        {!session?.user ? (
          <>
            <Link href={"/auth/login"}>Login</Link>
            <Link href={"/auth/register"}>Register</Link>
          </>
        ) : (
          <>
            <Link href={"#"}>{session.user.name}</Link>
            <Link href={"/dashboard"}>Dashboard</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
