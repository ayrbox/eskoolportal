import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { User } from 'database/entities/User';

import connectDb from '~/lib/connectDb';

const options = {
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;
        try {
          await connectDb();
        } catch (err) {
          console.error(err);
        }

        const user = await User.findOne({
          where: { email },
        });

        if (user) {
          // TODO: hash password
          const isValid = user.password === password;
          if (!isValid) {
            return Promise.reject(new Error('Invalid Username or password.'));
          }
          return Promise.resolve(user);
        } else {
          return Promise.reject(new Error('Authentication Error'));
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
};

export default (req, res) => NextAuth(req, res, options);
