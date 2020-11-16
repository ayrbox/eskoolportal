import nextConnect from 'next-connect';
import { User } from '@eskoolportal/api/src/models';
import { sign } from 'jsonwebtoken';
import config from 'config';
import cookie from 'cookie';

const handler = nextConnect();

handler.post(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email },
  });

  const isValid = await user.isPasswordValid(password);
  console.log('Password', isValid);

  if (!isValid) {
    return res.status(401).json({ message: 'Invalid user or password.' });
  }

  try {
    const secret = config.get('app.secret');
    const cookieName = config.get('app.authCookieName');

    const claims = { sub: user.id, email: user.email };
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
});

export default handler;
