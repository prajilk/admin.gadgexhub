"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { ZodAuthSchema } from "@/lib/zod-schemas/auth-schema";
import { motion as m } from "framer-motion";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

function AuthForm() {
  const [isPassword, setIsPassword] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [signInLoading, setSignInIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof ZodAuthSchema>>({
    resolver: zodResolver(ZodAuthSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSignIn(data: z.infer<typeof ZodAuthSchema>) {
    setError(null);
    setSignInIsLoading(true);

    try {
      const signInResponse = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: "/dashboard",
      });

      if (signInResponse?.error) {
        form.reset();
        throw new Error("Invalid credentials.");
      }
      toast.success("Signed in successfully. redirecting...");
      router.refresh();
      router.replace(signInResponse?.url || "/");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setSignInIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSignIn)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormControl>
                <Input placeholder="Email" {...field} radius="sm" size="sm" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Password"
                  radius="sm"
                  size="sm"
                  endContent={
                    isPassword ? (
                      <Eye
                        className="h-5 w-5 cursor-pointer text-gray-400"
                        onClick={() => setIsPassword(false)}
                      />
                    ) : (
                      <EyeOff
                        className="h-5 w-5 cursor-pointer text-gray-400"
                        onClick={() => setIsPassword(true)}
                      />
                    )
                  }
                  type={isPassword ? "password" : "text"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error ? (
          <m.span
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
            }}
            className="mt-3 block h-5 text-center text-xs font-medium text-destructive dark:text-red-500"
          >
            {error}
          </m.span>
        ) : (
          <span className="mt-3 block h-5" />
        )}
        <div className="mt-5 flex flex-col gap-3">
          <Button
            isLoading={signInLoading}
            color="primary"
            isDisabled={signInLoading}
            radius="full"
            type="submit"
          >
            Sign in
          </Button>
        </div>
      </form>
    </Form>
  );
}
export default AuthForm;
