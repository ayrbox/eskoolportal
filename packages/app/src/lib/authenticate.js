import { verify } from 'jsonwebtoken';
import config from 'config';

import { User } from '@eskoolportal/api/src/models';

const cookieName = config.get('app.authCookieName');
const secret = config.get('app.secret');

export const withAuthentication = (fn) => async (req, res) => {
  verify(req.cookies[cookieName], secret, async function (err, decoded) {
    if (!err && decoded) {
      const { email } = decoded;

      const user = await User.findOne({
        where: { email },
      });

      req.user = user;

      return await fn(req, res);
    }

    res.status(401).json({ message: 'Not authenticated' });
  });
};

export default withAuthentication;
