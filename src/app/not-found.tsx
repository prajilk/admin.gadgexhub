import { Button } from "@nextui-org/react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404",
  description: "Something went wrong",
};

export default function NotFound() {
  return (
    <div className="flex min-h-[100vh] flex-col items-center justify-center">
      <h1 className="animate-bounce text-6xl font-bold tracking-widest">404</h1>
      <h2 className="text-gry-900 text-2xl font-medium tracking-widest">
        Page not found
      </h2>
      <p className="my-3 text-sm text-muted-foreground">
        The page you tried to access does not exist.
      </p>
      <Button as={Link} href="/dashboard" color="primary" radius="full">
        Go to dashboard
      </Button>
    </div>
  );
}
