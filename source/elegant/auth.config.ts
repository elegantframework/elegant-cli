import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: `/admin`,
        verifyRequest: `/admin`,
        error: "/admin",
    },
    session: { strategy: "jwt" },
    providers: [],
} satisfies NextAuthConfig;