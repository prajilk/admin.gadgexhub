import type { Metadata } from "next";
import "./globals.css";
import NextUIProvider from "@/providers/nextui-provider";

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
    <html lang="en">
      <body className="font-poppins bg-gray-100 dark:bg-[#020817]">
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  );
}
