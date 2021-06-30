import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { User } from "~/database/entities/User";

import { ensureConnection } from "~/database";
import bcrypt from "bcrypt";

const authFailedMessage = "Authentication failed.";

const options = {
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;

        try {
          await ensureConnection();
        } catch (err) {
          console.error(err);
        }

        const user = await User.findOne({
          where: { email },
        });

        if (user) {
          const isValid = await bcrypt.compare(password, user.password);
          if (!isValid) {
            throw `/login?message=${authFailedMessage}`;
          }
          return user;
        } else {
          throw `/login?message=${authFailedMessage}`;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};

export default (req, res) => NextAuth(req, res, options);
