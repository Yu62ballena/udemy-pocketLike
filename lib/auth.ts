import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import Google from "next-auth/providers/google";
import NextAuth, { NextAuthConfig } from "next-auth";



export const config = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks:{
    session: ({session, token}) => {
      if(token?.sub) {
        session.user.id = token.sub
      }
      return session
    },
    jwt: ({user, token}) => {
      if(user) {
        token.uid = user.id
      }
      return token
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
}satisfies NextAuthConfig

export const {handlers, auth, signIn, signOut} = NextAuth(config)