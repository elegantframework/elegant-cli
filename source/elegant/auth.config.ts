import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: `/admin`,
        verifyRequest: `/admin`,
        error: "/admin",
    },
    session: { strategy: "jwt" },
    providers: [],
    callbacks: {
        jwt({ token, user }) {
            if (user) { // User is available during sign-in
              token.id = user.id
            }
            return token
        },
        session({ session, token }) {
            // @ts-expect-error
            session.user.id = token.id
            return session
        },
  },
} satisfies NextAuthConfig;