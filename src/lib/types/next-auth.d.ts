import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    name: string;
    role: string;
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
