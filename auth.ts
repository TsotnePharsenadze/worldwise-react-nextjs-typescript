import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/libs/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials.");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        if (!user) {
          throw new Error("Invalid credentials.");
        }

        if (!user?.hashedPassword) {
          throw new Error("Wrong authentication method");
        }

        const correctPassword = await bcrypt.compare(
          credentials.password as string,
          user?.hashedPassword
        );

        if (!correctPassword) throw new Error("Incorrect Credentials!");

        return user;
      },
    }),
  ],
});
