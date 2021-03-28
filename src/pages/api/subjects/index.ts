import { NextApiHandler } from 'next';
import { Subject } from '~/database/entities/Subject';
import { secureRoute } from '~/lib/secureRoute';

const handler: NextApiHandler = async (_, res) => {
  const subjects = await Subject.find();
  res.status(200).json(subjects);
};

export default secureRoute(handler);
