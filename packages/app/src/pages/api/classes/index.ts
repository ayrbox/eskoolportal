import { Class } from '@eskoolportal/core/lib/entities/Class';
import withAuthentication from '~/lib/withAuthentication';

const handler = async (req, res) => {
  const classes = await Class.find();

  res.status(200).json(classes);
};

export default withAuthentication(handler);
