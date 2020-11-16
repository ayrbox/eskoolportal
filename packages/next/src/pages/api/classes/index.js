import { Class } from '@eskoolportal/api/src/models';
import authenticate from '@lib/authenticate';

export default authenticate(async function handler(req, res) {
  const classes = await Class.findAll();

  res.status(200).json(classes);
});
