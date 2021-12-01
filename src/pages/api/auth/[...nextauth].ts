import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { User } from "~/database/entities/User";

import { ensureConnection } from "~/database";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

const authFailedMessage = "Authentication failed.";

const options = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) throw "Cred Error";

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
          console.log(user);
          const isValid = await bcrypt.compare(password, user.password);
          if (!isValid) {
            console.log("Password does not match");
            return null;
          }
          console.log("Valid User", user);
          return user;
        } else {
          // throw `/login?message=${authFailedMessage}`;
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: "INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw",
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
