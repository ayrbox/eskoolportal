import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '.prisma/client';

const options = {
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials) => {
                if (!credentials) throw 'Cred Error';

                const { email, password } = credentials;

                const prisma = new PrismaClient();

                const user = await prisma.user.findFirst({
                    where: { email },
                });

                if (user) {
                    const isValid = await bcrypt.compare(
                        password,
                        user.password
                    );
                    if (!isValid) {
                        console.error('[ERROR] Password does not match');
                        return null;
                    }
                    return user;
                } else {
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: '/login',
    },
    secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
};

export default (req: NextApiRequest, res: NextApiResponse) =>
    NextAuth(req, res, options);
