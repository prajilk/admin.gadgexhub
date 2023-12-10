"use client";

import { useSession, signOut } from "next-auth/react";
import { ReactNode } from "react";

const AutoSignOutProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();

  if (status === "authenticated" && !session.user.isAuthenticated) {
    signOut();
  }

  return <>{children}</>;
};

export default AutoSignOutProvider;
