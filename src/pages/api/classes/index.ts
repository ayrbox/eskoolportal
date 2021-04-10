import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { Class } from '~/database/entities/Class';
import { secureRoute } from '~/lib/secureRoute';

const handler = nextConnect();

handler.get(async (_, res: NextApiResponse) => {
  const classes = await Class.find();
  res.status(200).json(classes);
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const classData = req.body;

  console.log(classData);
  res.status(204).end();
});

export default secureRoute(handler);
