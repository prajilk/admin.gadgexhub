"use client";

import { NextUIProvider as Provider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const NextUIProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider className="flex flex-1 flex-col">
      <NextThemesProvider attribute="class" defaultTheme="dark">
        {children}
      </NextThemesProvider>
    </Provider>
  );
};

export default NextUIProvider;
