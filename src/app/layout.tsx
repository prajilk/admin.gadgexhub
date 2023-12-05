import type { Metadata } from "next";
import "./globals.css";
import NextUIProvider from "@/providers/nextui-provider";
import { headers } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Admin GadgeXhub",
  description: "Discover the Latest Gadgets: Your One-Stop Gadget Shop!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="bg-gray-100 font-poppins dark:bg-[#020817]">
        <NextUIProvider>{children}</NextUIProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
