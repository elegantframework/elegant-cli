import NextAuth, { Session } from 'next-auth';
import GitHubProvider from "next-auth/providers/github";
import Credentials from 'next-auth/providers/credentials';
import { z, string } from 'zod';
import { comparePasswords } from './Bcrypt';
import { getUser } from '../Db/Actions/User';
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/utils/Db/Prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.AUTH_GITHUB_ID as string,
            clientSecret: process.env.AUTH_GITHUB_SECRET as string,
            profile(profile) {
                return {
                id: profile.id.toString(),
                name: profile.name || profile.login,
                gh_username: profile.login,
                email: profile.email,
                image: profile.avatar_url,
                };
            },
        }),
        Credentials({
            credentials: {
                email: {
                },
                password: {},
            },
            authorize: async (credentials): Promise<any> => {
                const parsedCredentials = z
                    .object({
                    email: string({ required_error: "Email is required" })
                    .min(1, "Email is required")
                    .email("Invalid email"),
                    password: string({ required_error: "Password is required" })
                    .min(1, "Password is required")
                    .min(6, "Password must be more than 6 characters")
                    .max(32, "Password must be less than 32 characters"),
                    })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);

                if (!user) {
                    return null;
                };

                const passwordsMatch = comparePasswords(password, user.password || "");

                if(!passwordsMatch) {
                    throw new Error("User not found.");
                }

                if (passwordsMatch) {
                    return {
                      id: user.id,
                      name: user.name,
                      email: user.email,
                      image: user.image,
                    };
                };
                }

                return null;
            },
        }),
    ],
    pages: {
        signIn: `/admin`,
        verifyRequest: `/admin`,
        error: "/admin",
    },
    // adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    // cookies: {
    //     sessionToken: {
    //       name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
    //       options: {
    //         httpOnly: true,
    //         sameSite: "lax",
    //         path: "/",
    //         // When working on localhost, the cookie domain must be omitted entirely (https://stackoverflow.com/a/1188145)
    //         domain: VERCEL_DEPLOYMENT
    //           ? `.${process.env.NEXT_PUBLIC_APP_URL}`
    //           : undefined,
    //         secure: VERCEL_DEPLOYMENT,
    //       },
    //     },
    // },
    callbacks: {
        jwt({ token, user }) {
            if (user) { 
                token.id = user.id;
            }
            return token;
        },
        session: async ({ session, token }) => {
            // @ts-expect-error
            session.user.id = token.id;

            return session;
        },
    },
    trustHost: true
  })

export function getSession() {
  return auth() as Promise<Session | null>;
}

export function withSiteAuth(action: any) {
  return async (
    formData: FormData | null,
    siteId: string,
    key: string | null,
  ) => {
    const session = await getSession();
    if (!session) {
      return {
        error: "Not authenticated",
      };
    }
    const site = await prisma.site.findUnique({
      where: {
        id: siteId,
      },
    });
    if (!site || site.userId !== session.user?.id) {
      return {
        error: "Not authorized",
      };
    }

    return action(formData, site, key);
  };
}

// @todo: finish or delete 

// export function withPostAuth(action: any) {
//   return async (
//     formData: FormData | null,
//     postId: string,
//     key: string | null,
//   ) => {
//     const session = await getSession();
//     if (!session?.user.id) {
//       return {
//         error: "Not authenticated",
//       };
//     }
//     const post = await prisma.post.findUnique({
//       where: {
//         id: postId,
//       },
//       include: {
//         site: true,
//       },
//     });
//     if (!post || post.userId !== session.user.id) {
//       return {
//         error: "Post not found",
//       };
//     }

//     return action(formData, post, key);
//   };
// }