import { NextApiResponse } from 'next';
import { Class } from '~/database/entities/Class';
import { secureRoute } from '~/lib/secureRoute';

const handler = async (_, res: NextApiResponse) => {
  const classes = await Class.find();

  res.status(200).json(classes);
};

export default secureRoute(handler);
