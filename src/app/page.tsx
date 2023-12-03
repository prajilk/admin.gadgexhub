import AuthForm from "@/components/forms/auth-form";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Card, CardBody } from "@nextui-org/react";

const SignIn = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user) redirect("/dashboard");

  return (
    <div className="flex min-h-screen w-full items-start justify-center md:py-20">
      <Card className="w-full sm:w-[400px] md:rounded-3xl">
        <CardBody className="h-screen gap-7 px-5 py-10 md:h-max md:p-14 md:shadow-2xl">
          <h1 className="text-3xl font-light">Sign in as Admin </h1>
          <div className="flex flex-col gap-5">
            <AuthForm />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default SignIn;
