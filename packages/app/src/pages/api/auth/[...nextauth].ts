import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { User } from '@eskoolportal/core/lib/entities/User';

import connectDb from '~/lib/connectDb';

const options = {
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'email@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        // Add logic here to look up the user from the credentials supplied
        const { email, password } = credentials;

        try {
          await connectDb();
        } catch (err) {
          console.error(err);
        }

        const user = await User.findOne({
          where: { email },
        });

        // TODO: hash password
        const isValid = user.password === password;

        if (!isValid) {
          return Promise.reject(new Error('Invalid Username or password.'));
        }

        if (user) {
          return Promise.resolve(user);
        } else {
          return Promise.reject(new Error('Authentication Error'));
          // You can also Reject this callback with an Error or with a URL:
          // return Promise.reject(new Error('error message')) // Redirect to error page
          // return Promise.reject('/path/to/redirect'); // Redirect to a URL
        }
      },
    }),
  ],
};

export default (req, res) => NextAuth(req, res, options);
