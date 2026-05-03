import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "./db";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      email?: string | null;
    };
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        // 🔐 Validate input
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        // 🔍 Find user
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("No user found");
        }

        // 🔑 Compare password
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Invalid password");
        }

        // ✅ Return safe user object (IMPORTANT)
        return {
          id: user.id,
          email: user.email,
        };
      },
    }),
  ],

  // ✅ FIXED TYPE ISSUE
  session: {
    strategy: "jwt",
  },

  // 🔐 Attach user ID to session
  callbacks: {
  async session({ session, token }) {
    if (session.user && token.sub) {
      session.user.id = token.sub;
    }
    return session;
  },
},

  // 🔑 Required for production
  secret: process.env.NEXTAUTH_SECRET,
};