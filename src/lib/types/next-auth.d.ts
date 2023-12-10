import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    name: string;
    role: string;
    isAuthenticated: boolean;
  }
  interface Session {
    user: User & {
      name: string;
    };
    session: {
      name: string;
    };
  }
}
