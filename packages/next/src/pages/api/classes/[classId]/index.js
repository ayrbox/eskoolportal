import models from '@eskoolportal/api/src/models';
import authenticate from '@lib/authenticate';

const handler = authenticate(async function (req, res) {
  const { classId } = req.query;
  const classInfo = await models.Class.findByPk(classId);

  res.status(200).json(classInfo);
});

export default handler;
