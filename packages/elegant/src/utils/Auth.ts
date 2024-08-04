import NextAuth from 'next-auth';
import { authConfig } from '../../auth.config';
import GitHubProvider from "next-auth/providers/github";
import Credentials from 'next-auth/providers/credentials';
import { z, string } from 'zod';
import { getUser } from './Db/Actions/Actions';
import { comparePasswords } from './Bcrypt';
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
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

          // @ts-expect-error
          const passwordsMatch = comparePasswords(password, user.password);

          if(!passwordsMatch) {
            throw new Error("User not found.");
          }

          if (passwordsMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              image: user.image
            };
          };
        }

        return null;
      },
    }),
  ],
});