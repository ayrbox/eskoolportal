import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { User } from '@eskoolportal/core/lib/entities/User';
import { sign } from 'jsonwebtoken';
import config from 'config';
import cookie from 'cookie';
import connectDb from '~/lib/connectDb';

const authenticateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  await connectDb();

  // TODO: replace with Users repository
  const user = await User.findOne({
    where: { email },
  });

  // const isValid = await user.isPasswordValid(password);
  // TODO: repository thingy
  const isValid = (await user.password) === password;

  if (!isValid) {
    return res.status(401).json({ message: 'Invalid user or password.' });
  }

  try {
    const secret = config.get('app.secret');
    const cookieName = config.get('app.authCookieName');

    const claims = {
      sub: user.id,
      email: user.email,
      avatar: user.avatar,
      name: user.name,
    };

    const authToken = sign(claims, secret, { expiresIn: '1h' });
    res.setHeader(
      'Set-Cookie',
      cookie.serialize(cookieName, authToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 3600,
        path: '/',
      })
    );

    res.json({ message: 'Welcome to eskoolportal' });
  } catch (err) {
    console.log(err);

    res.status(500).json(err);
  }
};

export default nextConnect().post(authenticateUser);
