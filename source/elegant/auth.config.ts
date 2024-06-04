import type { NextAuthConfig } from 'next-auth';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/utils/Prisma";

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;

export const authConfig = {
    pages: {
        signIn: `/admin/login`,
        verifyRequest: `/admin/login`,
        error: "/admin/login", // Error code passed in query string as ?error=
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    cookies: {
      sessionToken: {
        name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
        options: {
          httpOnly: true,
          sameSite: "lax",
          path: "/",
          // When working on localhost, the cookie domain must be omitted entirely (https://stackoverflow.com/a/1188145)
          domain: VERCEL_DEPLOYMENT
            ? `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
            : undefined,
          secure: VERCEL_DEPLOYMENT,
        },
      },
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/admin');
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/admin', nextUrl));
            }
            return true;
            },
      jwt: async ({ token, user }) => {
        if (user) {
          token.user = user;
        }
        return token;
      },
      session: async ({ session, token }) => {
        session.user = {
          ...session.user,
          // @ts-expect-error
          id: token.sub,
          // @ts-expect-error
          username: token?.user?.username || token?.user?.gh_username,
        };
        return session;
      },
    },
    providers: [],
} satisfies NextAuthConfig;