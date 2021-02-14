import { Class } from '@eskoolportal/core/lib/entities/Class';
import { secureRoute } from '~/lib/secureRoute';

const handler = async function (req, res) {
  const classId = req.query.classId as string;
  const classDetail = await Class.findOne({ id: classId });

  res.status(200).json(classDetail);
};

export default secureRoute(handler);
