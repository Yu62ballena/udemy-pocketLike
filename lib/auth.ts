import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import Google from "next-auth/providers/google";
import NextAuth, { NextAuthConfig } from "next-auth";

// ログインを許可するメールアドレスリスト
// 個人利用の場合は使う
// もし、一般公開する場合はここをコメントアウト
const ALLOWED_EMAILS = ["yu62ballena@gmail.com"];
// ログイン可能なメールアドレスここまで

export const config = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    // メールアドレスによるログイン制約ここから
    signIn: async ({ user, account }) => {
      if (account?.provider === "google") {
        const email = user.email;

        if (!email || !ALLOWED_EMAILS.includes(email)) {
          console.log(`ログイン拒否： ${email}`);
          return false;
        }

        console.log(`ログイン許可： ${email}`);
        return true;
      }

      return true;
    },
    // メールアドレスによるログイン制約ここまで


    session: ({ session, token }) => {
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    jwt: ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
