import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./prisma";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 1 * 60 * 60,
  },
  jwt: {
    maxAge: 12 * 60 * 60,
  },
  pages: {
    signIn: "/",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }
        const admin = await db.admin.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!admin) return null;

        if (admin.password) {
          const passwordMatch = await bcrypt.compare(
            credentials.password,
            admin.password,
          );
          if (!passwordMatch) return null;
        }

        return {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
          isAuthenticated: true,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
        };
      }
      return token;
    },
    async session({ session, token }) {
      try {
        if (token.sub) {
          const user = await db.admin.findUnique({
            where: { id: token.sub },
          });
          if (!user) {
            return {
              ...session,
              user: {
                ...session.user,
                id: token.sub,
                role: token.role,
                isAuthenticated: false,
              },
            };
          }
        }
      } catch (error) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.sub,
            role: token.role,
            isAuthenticated: false,
          },
        };
      }
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          role: token.role,
          isAuthenticated: true,
        },
      };
    },
  },
};
