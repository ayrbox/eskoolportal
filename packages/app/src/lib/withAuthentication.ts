import { verify } from 'jsonwebtoken';
import config from 'config';

import { User } from '@eskoolportal/core/lib/entities/User';
import withConnection from './withConnection';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

declare module 'http' {
  interface IncomingMessage {
    user: User | undefined | null;
    cookie: string | undefined | null;
  }
}

const cookieName = config.get('app.authCookieName');
const secret = config.get('app.secret');

export const withAuthentication = (
  fn: NextApiHandler | NextApiHandler
) => async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await withConnection(() => {});

  try {
    const decoded = verify(req.cookies[cookieName], secret);
    const { email } = decoded as { email: string };

    const user: User = await User.findOne({
      where: { email },
    });
    req.user = user;
    return fn(req, res);
  } catch (err) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
};

export default withAuthentication;
