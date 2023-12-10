import SignOutButton from "@/components/sign-out-button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const SignOut = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");

  return (
    <div className="flex min-h-screen min-w-full items-center justify-center px-5">
      <div className="space-y-5 rounded-3xl bg-white p-10 text-center shadow-lg dark:bg-dark">
        <div className="space-y-2 text-black dark:text-white">
          <h1 className="text-3xl font-light">Sign out</h1>
          <p>Are you sure you want to sign out?</p>
        </div>
        <SignOutButton />
      </div>
    </div>
  );
};

export default SignOut;
