import { Class } from '@eskoolportal/core/lib/entities/Class';
import { secureRoute } from '~/lib/secureRoute';

const handler = async (req, res) => {
  const classes = await Class.find();

  res.status(200).json(classes);
};

export default secureRoute(handler);
