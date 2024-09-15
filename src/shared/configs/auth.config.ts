import type { AuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authConfig: AuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        console.log("credentials");
        // if (!credentials?.email || !credentials.password) return null;

        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user as User;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
        }
      },
    }),
  ],
  session: {
    maxAge: 60 * 60 * 24, // Время сессии в секундах (24 часа)
    updateAge: 60 * 60,   // Время обновления сессии (каждый час)
  },
  pages: {
    signIn: "/login",
  },
};
