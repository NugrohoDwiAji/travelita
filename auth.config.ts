// auth.config.ts
import type { NextAuthConfig } from "next-auth";
import { prisma } from "@/app/lib/prisma";
import { hashPassword } from "@/app/utils/password";

export const authConfig = {
  pages: {
    signIn: "/signin",
  },
  session: { strategy: "jwt", maxAge: 7 * 24 * 60 * 60 },
  callbacks: {
    async signIn({ user, account }) {
      // Handle OAuth sign-in (Google)
      if (account?.provider === "google" && user.email) {
        try {
          // Check if user exists
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
          });

          if (!existingUser) {
            // Create new user from Google sign-in
            const newUser = await prisma.user.create({
              data: {
                email: user.email,
                name: user.name || "User",
                username: user.email.split("@")[0] + "_" + Math.random().toString(36).slice(2, 9),
                password: await hashPassword(Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)),
                role: "USER",
              },
            });

            // Update user object with new user ID for session
            user.id = newUser.id;
            user.role = newUser.role;
          } else {
            // Update user object with existing user's data
            user.id = existingUser.id;
            user.role = existingUser.role;
          }
          return true;
        } catch (error) {
          console.error("Error in Google signIn callback:", error);
          return false;
        }
      }

      // Allow credentials sign-in
      if (account?.provider === "credentials") {
        return true;
      }

      return false;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  // Biarkan providers kosong di sini, kita isi nanti di auth.ts
  providers: [], 
} satisfies NextAuthConfig;